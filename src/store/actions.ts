import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import Tag from '@/models/tag'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.CreateTag]({ commit }: AugmentedActionContext, payload: Tag): Promise<number>
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.CreateTag]({ commit }, tag: Tag) {
    console.log(`Create a tag: ${tag.name}`)
    return 0
  },
}