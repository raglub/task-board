import { TypedIpcRenderer } from "electron-typed-ipc";

import { Events, IpcCommands } from "./ipc-commands";

const IpcInvoker = window.ipcRenderer as TypedIpcRenderer<Events, IpcCommands>
export { IpcInvoker };