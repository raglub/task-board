import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { State, state } from './state'
// import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'

export const store = new Vuex.Store({
  state,
  getters: {},
  mutations,
  actions,
})