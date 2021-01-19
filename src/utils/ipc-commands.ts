import { Duration } from "@/models/duration";
import { Guid16 } from "@/types/guid16";

export type Events = {
};
 
export type IpcCommands = {
  stopTask: (taskId: Guid16) => Promise<Duration | null>;
  startTask: (taskId: Guid16) => Promise<Duration>;
};