import { Duration } from '@/models/duration'
import Tag from '@/models/tag'
import Task from '@/models/task'
import TaskEdit from '@/models/task-edit'
import { Guid16 } from '@/types/guid16'
import { IpcChannel } from './ipc-channel'
import TaskFilter from './task-filter'

export type Events = {
};

export type IpcCommands = {
  [IpcChannel.CountTasks]: (filter: TaskFilter) => Promise<number>;
  [IpcChannel.StopTask]: (taskId: Guid16) => Promise<Duration | null>;
  [IpcChannel.CreateTag]: (name: string) => Promise<Tag>;
  [IpcChannel.CreateTask]: (task: Task) => Promise<Task>;
  [IpcChannel.FindDurationsFromTo]: (from: Date, to: Date) => Promise<Duration[]>;
  [IpcChannel.FindDurationsForTask]: (taskId: Guid16) => Promise<Duration[]>;
  [IpcChannel.FindOneTask]: (taskId: Guid16) => Promise<Task>;
  [IpcChannel.GetAllTags]: () => Promise<Tag[]>;
  [IpcChannel.FindAllTasks]: (filter: TaskFilter) => Promise<Task[]>;
  [IpcChannel.GetVersion]: () => Promise<string>;
  [IpcChannel.StartTask]: (taskId: Guid16) => Promise<Duration>;
  [IpcChannel.TotalDurationForTask]: (taksId: Guid16) => Promise<string>;
  [IpcChannel.UpdateTask]: (taskEdit: TaskEdit) => Promise<void>;
};
