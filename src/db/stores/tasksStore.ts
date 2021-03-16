import { plainToClass } from 'class-transformer'
import Task from '@/models/task'
import RootDir from '@/utils/rootDir'
import DurationsStore from './durationsStore'
import { Duration } from '@/utils/duration'
import TaskEdit from '@/models/task-edit'
import Datastore from 'nedb-promises'
import TaskFilter from '@/utils/task-filter'

export class TasksStore {
  static db: any

  constructor () {
    if (!TasksStore.db) {
      let dbPath = RootDir.combine('db/tasks.db')
      if (process.env.NODE_ENV === 'test') {
        dbPath = RootDir.combine('db/tasks.test.db')
      }
      TasksStore.db = new Datastore({
        filename: dbPath,
        autoload: true
      })
    }
  }

  query (pkgs: any, query: any): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      pkgs.find(query).exec((error: any, result: Task[]) => {
        if (error !== null) reject(error)
        else resolve(result)
      })
    })
  }

  async findAllAsync (filter: TaskFilter): Promise<Task[]> {
    let result: Task[] = []
    const durationStore = new DurationsStore()
    let rawTasks: Task[]
    const query = this.queryForFilter(filter)
    rawTasks = await TasksStore.db.find(query).skip((filter.page-1)*filter.perPage).limit(filter.perPage)
    for (let i = 0; i < rawTasks.length; i++) {
      const task = rawTasks[i]
      const durations = (await durationStore.findAllForTaskId(task._id)) as any as Duration[]
      task.isRunning = false;
      durations.forEach(duration => {
        if (duration.to === null) {
          task.isRunning = true;
        }
      })
    }
    result = plainToClass(Task, rawTasks)
    return result
  }

  async countAsync (filter: TaskFilter): Promise<number> {
    const query = this.queryForFilter(filter)
    return await TasksStore.db.count(query)
  }

  public async findAsync (id: string): Promise<Task> {
    const rawTask = await TasksStore.db.find({ _id: id })
    const task = Task.plainToClass(rawTask)
    return task
  }

  private queryForFilter(filter: TaskFilter) {
    let query: any = {}
    if (!filter.showClosed) {
      query = {isClosed: false}
      query['isClosed'] = false
    }
    if (filter.searchText !== '') {
      query['name'] = new RegExp(filter.searchText, 'i')
    }
    if (filter.tagIds.length > 0) {
      const tagIdsQuery: any[] = []
      filter.tagIds.forEach(id => {
        tagIdsQuery.push({ tagIds: id })
      })
      query['$and'] = tagIdsQuery
    }
    return query
  }

  /// **
  // * @description Updates exising Task to database.
  // */
  public async update (taskEdit: TaskEdit) {
    if (taskEdit._id === undefined) { throw new Error('Id for task is undefined') }
    const task = await this.findAsync(taskEdit._id)
    task.description = taskEdit.description
    task.isClosed = taskEdit.isClosed
    task.isRunning = taskEdit.isRunning
    task.name = taskEdit.name
    task.status = taskEdit.status
    task.tagIds = taskEdit.tagIds
    await TasksStore.db.update({ _id: task._id }, task)
    const durationStore = new DurationsStore()
    await taskEdit.durations.forEach(async (duration) => {
      const oldDuration = await durationStore.find(duration._id)
      
      if (duration.action === 'edit') {
        oldDuration.from = duration.from
        oldDuration.to = duration.to
        await durationStore.update(oldDuration)
      }
      if (duration.action === 'delete') {
        await durationStore.remove(duration._id)
      }

      if (duration.action === 'new') {
        await durationStore.insert({
          from: duration.from,
          to: duration.to,
          taskId: duration.taskId,
          _id: ''
        })
      }
    })
  }

  /// **
  // * @description Inserts a new Task to database.
  // * @param {Task} task
  // */
  public async insert (task: Task): Promise<Task> {
    task._id = undefined as any
    const rawTask: Task = await TasksStore.db.insert(task)
    task._id = rawTask._id
    return task
  }
}
