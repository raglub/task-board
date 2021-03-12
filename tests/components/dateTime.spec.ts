import { expect } from 'chai'
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
    expect(wrapper.attributes('title')).to.include('1970-01-01 01:00:13')
  })
})
