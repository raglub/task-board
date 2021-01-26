import { Duration } from "@/models/duration";
import Task from "@/models/task";
import { Guid16 } from "@/types/guid16";
import { IpcTypes } from "./ipc-types";

export type Events = {
};
 
export type IpcCommands = {
  stopTask: (taskId: Guid16) => Promise<Duration | null>;
  startTask: (taskId: Guid16) => Promise<Duration>;
  [IpcTypes.CreateTask]: (task: Task) => Promise<Task>;
};