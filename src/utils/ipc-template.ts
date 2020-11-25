import { IpcTypes } from './ipc-types'
import Tag from '@/models/tag';

export interface IpcTemplate {
    [IpcTypes.CreateTag] (name: string): Promise<Tag>;
    [IpcTypes.GetAllTags] (): Promise<Tag[]>;
    [IpcTypes.GetVersion] (): Promise<string>;
}
