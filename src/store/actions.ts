import { ActionTree, ActionContext } from 'vuex'
import { RootState } from './state'
import { Mutations } from './mutations'
import { ActionTypes } from './action-types'
import Tag from '@/models/tag'
import Task from '@/models/task'
import { IpcInvoker } from '@/utils/ipc-invoker'
import { IpcChannel } from '@/utils/ipc-channel'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RootState, RootState>, 'commit'>

export interface ActionsBase {
  [ActionTypes.CreateTag]({ commit }: any, payload: Tag): Promise<number>;

  [ActionTypes.LoadTasks]({ commit }: any, filter: any): Promise<Task[]>;
}

export const Actions: ActionsBase = class Actions {
  static async createTag (vue: Vue, tag: Tag) {
    return await vue.$store.dispatch(ActionTypes.CreateTag, tag)
  }

  static async loadTasks (vue: Vue, filter: any) {
    return await vue.$store.dispatch(ActionTypes.LoadTasks, filter)
  }
}

export const actions: ActionTree<RootState, RootState> & ActionsBase = {
  async [ActionTypes.CreateTag] ({ commit }, tag: Tag) {
    return 0
  },

  async [ActionTypes.LoadTasks] ({ commit }, filter: any) {
    return await IpcInvoker.invoke(IpcChannel.FindAllTasks)
  }
}
