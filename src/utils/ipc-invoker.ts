import { IpcTypes } from './ipc-types';
import Tag from '@/models/tag';
import { IpcTemplate } from './ipc-template';
const { ipcRenderer } = window.require('electron')

export const IpcInvoker: IpcTemplate = class IpcInvoker {
    static async [IpcTypes.CreateTag] (name: string): Promise<Tag> {
        return await ipcRenderer.invoke(IpcTypes.CreateTag, name);
    }
}
