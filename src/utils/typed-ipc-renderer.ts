// import { ipcRenderer } from "electron";
const { ipcRenderer } = window.require('electron')
// let { TypedIpcRenderer } = window.require('electron-typed-ipc')
import { TypedIpcRenderer } from "electron-typed-ipc";

import { Events, IpcCommands } from "./ipc-commands";

export default ipcRenderer as TypedIpcRenderer<Events, IpcCommands>;