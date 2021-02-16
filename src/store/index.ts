import Vue from 'vue'
import Vuex from 'vuex'
import { createDirectStore } from 'direct-vuex'
import { RootState } from './state'
// import { Getters, getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { ActionTypes } from './action-types'
import { IpcInvoker } from '@/utils/ipc-invoker'
import { IpcChannel } from '@/utils/ipc-channel'
import TaskFilter from '@/utils/task-filter'
import Tag from '@/models/tag'

Vue.use(Vuex)

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  state: {
    counter: 0,
    tasks: []
  },
  getters: {},
  mutations,
  actions
})

// Export the direct-store instead of the classic Vuex store.
export default store

// The following exports will be used to enable types in the
// implementation of actions and getters.
export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
}

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore;
  }
}
