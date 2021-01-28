import CreateTagDto from "@/dtos/create-tag-dto";
import { Duration } from "@/models/duration";
import Tag from "@/models/tag";
import Task from "@/models/task";
import { Guid16 } from "@/types/guid16";
import { IpcChannel } from "./ipc-channel";

export type Events = {
};
 
export type IpcCommands = {
  stopTask: (taskId: Guid16) => Promise<Duration | null>;
  [IpcChannel.CreateTag]: (name: string) => Promise<Tag>;
  [IpcChannel.CreateTask]: (task: Task) => Promise<Task>;
  [IpcChannel.StartTask]: (taskId: Guid16) => Promise<Duration>;
  [IpcChannel.TotalDurationForTask]: (taksId: Guid16) => Promise<string>;
};