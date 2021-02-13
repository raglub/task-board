import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { RootState } from './state'

export type Mutations<S = RootState> = {
  [MutationTypes.SET_COUNTER](state: S, payload: number): void;
}

export const mutations: MutationTree<RootState> & Mutations = {
  [MutationTypes.SET_COUNTER] (state, payload: number) {
    state.counter = payload
  }
}
