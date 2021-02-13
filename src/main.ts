import devtools from '@vue/devtools'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from '@/store/index'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

if (process.env.NODE_ENV === 'development') {
  // devtools.connect()
}

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app')
