import { ActionTypes } from './action-types'
import Tag from '@/models/tag'
import { IpcInvoker } from '@/utils/ipc-invoker'
import { IpcChannel } from '@/utils/ipc-channel'
import TaskFilter from '@/utils/task-filter'

export const actions = {
  async [ActionTypes.CreateTag] (context: any, tag: Tag) {
    return 0
  },
  async [ActionTypes.LoadTasks] (context: any, filter: TaskFilter) {
    return await IpcInvoker.invoke(IpcChannel.FindAllTasks, filter)
  },
  async [ActionTypes.CountTasks] (context: any, filter: TaskFilter) {
    return await IpcInvoker.invoke(IpcChannel.CountTasks, filter)
  }
}
