import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { ActionTypes } from './action-types'
import Tag from '@/models/tag'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface ActionsBase {
  [ActionTypes.CreateTag]({ commit }: any, payload: Tag): Promise<number>
}

export const Actions: ActionsBase = class Actions {
  static async createTag(vue: Vue, tag: Tag) {
    return await vue.$store.dispatch(ActionTypes.CreateTag, tag)
  }
}

export const actions: ActionTree<State, State> & ActionsBase = {
  async [ActionTypes.CreateTag]({ commit }, tag: Tag) {
    return 0
  },
}
