import { IpcTypes } from './ipc-types';
import Tag from '@/models/tag';
import { IpcTemplate } from './ipc-template';
import { Duration } from '@/models/duration';
import { Guid16 } from '@/types/guid16';
const { ipcRenderer } = window.require('electron')

export const IpcInvoker: IpcTemplate = class IpcInvoker {
    static async [IpcTypes.CreateTag] (name: string): Promise<Tag> {
        return await ipcRenderer.invoke(IpcTypes.CreateTag, name);
    }

    static async [IpcTypes.GetAllTags] (): Promise<Tag[]> {
        return await ipcRenderer.invoke(IpcTypes.GetAllTags);
    }

    static async [IpcTypes.GetVersion] (): Promise<string> {
        return await ipcRenderer.invoke(IpcTypes.GetVersion)
    }

    static async [IpcTypes.CreateDuration] (duration: Duration): Promise<Duration> {
        return await ipcRenderer.invoke(IpcTypes.CreateDuration, duration)
    }

    static async [IpcTypes.StartDuration] (taskId: Guid16): Promise<Duration> {
        return await ipcRenderer.invoke(IpcTypes.StartDuration, taskId)
    }
}
