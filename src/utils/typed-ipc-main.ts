import DurationsStore from "@/db/stores/durationsStore";
import { Duration } from "@/models/duration";
import { Guid16 } from "@/types/guid16";
import { ipcMain } from "electron";
import { IpcCommands } from "./ipc-commands";

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
  
  async startTask (taskId: Guid16) {
    const durationsStore = new DurationsStore()
		const duration = new Duration()
    duration.taskId = taskId
    duration.from = Date.now()
    return await durationsStore.insert(duration)
	}
}

export default class TypedIpcMain {
	static async register () {
    try {
      const api = new IpcApi()
      const apiKeys = ['startTask', 'stopTask']
      for (let i = 0; i < apiKeys.length; i++) {
        const apiKey = apiKeys[i]
        // for (let apiKey in api) {
        const method = (api as any)[apiKey] 
        ipcMain.handle(apiKey, (event: any, ...args: any): any => {
          return method(...args)
        })
      }
    }catch (err) {
      console.error(err)
    }
	}
}
