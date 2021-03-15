import { expect } from 'chai'
import Moment from 'moment'
import { shallowMount } from '@vue/test-utils'
import DateTime from '@/components/DateTime.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

describe('DateTime.vue', () => {
  it('renders title', () => {
    const value = 13000
    const wrapper = shallowMount(DateTime, {
      propsData: { value }
    })
    const stillUtc = Moment.utc(value).toDate()
    const datetime = Moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss')
    expect(wrapper.attributes('title')).to.include(datetime)
  })
})
