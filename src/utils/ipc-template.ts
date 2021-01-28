import { IpcTypes } from './ipc-types'
import Tag from '@/models/tag';
import { Duration } from '@/models/duration';
import { Guid16 } from '@/types/guid16';

export interface IpcTemplate {
    [IpcTypes.CreateTag] (name: string): Promise<Tag>;
    [IpcTypes.GetAllTags] (): Promise<Tag[]>;
    [IpcTypes.GetVersion] (): Promise<string>;
    [IpcTypes.CreateDuration] (duration: Duration): Promise<Duration>;
}
