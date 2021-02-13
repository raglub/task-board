import Vue from 'vue'
import Vuex from 'vuex'

import { RootState } from './state'
// import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store<RootState>({
  state: {
    counter: 0,
    tasks: []
  },
  getters: {},
  mutations,
  actions
})
