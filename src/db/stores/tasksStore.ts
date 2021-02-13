import { plainToClass } from 'class-transformer'
import Task from '@/models/task'
import { DateTimeConverter } from '../../utils/dateTimeConverter'
import RootDir from '@/utils/rootDir'
import DurationsStore from './durationsStore'
import { Duration } from '@/utils/duration'
import TaskEdit from '@/models/task-edit'

const Datastore = require('nedb-promises')
const path = require('path')

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

	async findAllAsync (): Promise<Task[]> {
	  let result: Task[] = []
	  const durationStore = new DurationsStore()
	  const rawTasks: Task[] = await TasksStore.db.find({})
	  await rawTasks.forEach(async (task) =>
	    task.durations = (await durationStore.findAllForTaskId(task._id)) as any as Duration[]
	  )
	  result = plainToClass(Task, rawTasks)
	  return result
	}

	public async findAsync (id: string): Promise<Task> {
	  const rawTask = await TasksStore.db.find({ _id: id })
	  const task = Task.plainToClass(rawTask)
	  const durationStore = new DurationsStore()
	  task.durations = (await durationStore.findAllForTaskId(task._id)) as any as Duration[]
	  return task
	}

	/// **
	// * @description Updates exising Task to database.
	// * @param {string} id
	// * @param {Task} task
	// */
	public async update (taskEdit: TaskEdit) {
	  if (taskEdit._id === undefined) { throw 'Id for task is undefined' }
	  const task = await this.findAsync(taskEdit._id)
	  task.description = taskEdit.description
	  task.isClosed = taskEdit.isClosed
	  task.isRunning = taskEdit.isRunning
	  task.name = taskEdit.name
	  task.tagIds = taskEdit.tagIds
	  task.durations.length = 0
	  await TasksStore.db.update({ _id: task._id }, task)
	  const durationStore = new DurationsStore()
	  await taskEdit.durations.forEach(async (duration) => {
	    const oldDuration = await durationStore.find(duration._id)
	    if (oldDuration.from !== duration.from || oldDuration.to !== duration.to) {
	      await durationStore.update(duration)
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
