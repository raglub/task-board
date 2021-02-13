import Vue from 'vue'
import Vuex from 'vuex'

import { RootState } from './state'
// import { Getters, getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

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
