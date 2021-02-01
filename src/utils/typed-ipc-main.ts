import DurationsStore from "@/db/stores/durationsStore";
import { TagsStore } from "@/db/stores/tagsStore";
import { TasksStore } from "@/db/stores/tasksStore";
import CreateTagDto from "@/dtos/create-tag-dto";
import { Duration } from "@/models/duration";
import Tag from "@/models/tag";
import Task from "@/models/task";
import { Guid16 } from "@/types/guid16";
import { ipcMain } from "electron";
import { DateTimeConverter } from "./dateTimeConverter";
import { IpcChannel } from "./ipc-channel";
import { IpcCommands } from "./ipc-commands";
const appVersion = require('../../package.json').version

class IpcApi implements IpcCommands {
	async stopTask (taskId: Guid16) {
    const durationsStore = new DurationsStore()
    const durations = await durationsStore.findAllForTaskId(taskId)
		for(let i = 0; i < durations.length; i++) {
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
		const duration = new Duration()
    duration.taskId = taskId
    duration.from = Date.now()
    return await durationsStore.insert(duration)
  }

  async [IpcChannel.FindDurationsFromTo] (from: Date, to: Date): Promise<Duration[]> {
    return await new DurationsStore().findFromTo(from, to);
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
    var durations = await store.findAllForTaskId(taskId)
		
    var value = 0;
		durations.forEach( function( duration : Duration)
		{
			if( duration.to == null )
			{
				value += Date.now() - duration.from;
			}
			else
			{
				value += duration.to - duration.from;
			}
		} );
		return DateTimeConverter.toHHMMSS( value/1000 );
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
    task = await tasksStore.insert(task);
    return task;
  }

  async [IpcChannel.FindAllTasks] () {
    const tasksStore = new TasksStore()
    const durationStore = new DurationsStore()
    const result = [];
    const tasks = await tasksStore.findAllAsync();
    for(let i = 0; i < tasks.length; i++)
    {
      const task = tasks[i]
      const durations = await durationStore.findAllForTaskId(task._id)
      task.durations = [] // durations as any[]
      result.push(Task.cast(tasks[i]));
    }
    return result;
  }

  async [IpcChannel.UpdateTask] (task: Task): Promise<void> {
    await new TasksStore().update(task)
  }

  async [IpcChannel.MigrateDurationsToDurationsStore] (): Promise<void> {
    console.info("The migration has been begun.")
    const tasksStore = await new TasksStore()
    const durationsStore = await new DurationsStore()
    const tasks = await tasksStore.findAllAsync()
    for(let i = 0; i < tasks.length; i++) {
      const task = tasks[i]
      for(let durationIndex = 0; durationIndex < task.durations.length; durationIndex++) {
        const duration = task.durations[durationIndex]
        let newDuration = new Duration()
        newDuration.taskId = task._id
        newDuration.from = duration.from
        newDuration.to = duration.to
        newDuration = await durationsStore.insert(newDuration)
        console.info('Inserted:')
        console.info(newDuration)
      }
      if (task.durations.length > 0) {
        task.durations = []
        tasksStore.update(task)
      }
    }
    console.info("The migration has been finished.")
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
    }catch (err) {
      console.error(err)
    }
	}
}
