import DurationsStore from '@/db/stores/durationsStore'
import { TagsStore } from '@/db/stores/tagsStore'
import { TasksStore } from '@/db/stores/tasksStore'
import CreateTagDto from '@/dtos/create-tag-dto'
import { Duration } from '@/models/duration'
import Tag from '@/models/tag'
import Task from '@/models/task'
import TaskEdit from '@/models/task-edit'
import { Guid16 } from '@/types/guid16'
import { ipcMain } from 'electron'
import { DateTimeConverter } from './dateTimeConverter'
import { IpcChannel } from './ipc-channel'
import { IpcCommands } from './ipc-commands'
import TaskFilter from './task-filter'
const appVersion = require('../../package.json').version

class IpcApi implements IpcCommands {
  async stopTask (taskId: Guid16) {
    const durationsStore = new DurationsStore()
    const durations = await durationsStore.findAllForTaskId(taskId)
    for (let i = 0; i < durations.length; i++) {
      const duration = durations[i]
      if (!duration.to) {
        duration.to = Date.now()
        await durationsStore.update(duration)
      }
    }
    return null
  }

  async [IpcChannel.StartTask] (taskId: Guid16) {
    const durationsStore = new DurationsStore()
    await durationsStore.stopActive()
    const duration = new Duration()
    duration.taskId = taskId
    duration.from = Date.now()
    return await durationsStore.insert(duration)
  }

  async [IpcChannel.FindDurationsForTask] (taskId: Guid16): Promise<Duration[]> {
    return await new DurationsStore().findAllForTaskId(taskId)
  }

  async [IpcChannel.FindDurationsFromTo] (from: Date, to: Date): Promise<Duration[]> {
    return await new DurationsStore().findFromTo(from, to)
  }

  async [IpcChannel.FindOneTask] (taskId: Guid16): Promise<Task> {
    return await new TasksStore().findAsync(taskId)
  }

  async [IpcChannel.GetAllTags] (): Promise<Tag[]> {
    return await new TagsStore().findAllAsync()
  }

  async [IpcChannel.GetVersion] (): Promise<string> {
    return appVersion
  }

  async [IpcChannel.TotalDurationForTask] (taskId: Guid16) {
    const store = new DurationsStore()
    const durations = await store.findAllForTaskId(taskId)

    let value = 0
    durations.forEach(function (duration: Duration) {
      if (duration.to == null) {
        value += Date.now() - duration.from
      } else {
        value += duration.to - duration.from
      }
    })
    return DateTimeConverter.toHHMMSS(value / 1000)
  }

  async [IpcChannel.CreateTag] (name: string): Promise<Tag> {
    const tagsStore = new TagsStore()
    const tag = new CreateTagDto()
    tag.description = ''
    tag.name = name
    const newTag = await tagsStore.insert(tag)
    return newTag
  }

  async [IpcChannel.CreateTask] (task: Task) {
    const tasksStore = new TasksStore()
    task = await tasksStore.insert(task)
    return task
  }

  async [IpcChannel.FindAllTasks] (filter: TaskFilter) {
    const tasksStore = new TasksStore()
    const result = []
    const tasks = await tasksStore.findAllAsync(filter)
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i]
      result.push(Task.cast(task))
    }
    return result
  }

  async [IpcChannel.CountTasks] (filter: TaskFilter) {
    const tasksStore = new TasksStore()
    return await tasksStore.countAsync(filter)
  }

  async [IpcChannel.UpdateTask] (taskEdit: TaskEdit): Promise<void> {
    await new TasksStore().update(taskEdit)
  }
}

export default class TypedIpcMain {
  static async register () {
    try {
      const api = new IpcApi()
      const channels = Object.values(IpcChannel)
      for (let i = 0; i < channels.length; i++) {
        const channel = channels[i]
        const method = (api as any)[channel]
        ipcMain.handle(channel, (event: any, ...args: any): any => {
          return method(...args)
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
}
