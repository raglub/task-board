import { expect } from 'chai'
import Moment from 'moment'
import { shallowMount } from '@vue/test-utils'
import EditTask from '@/components/EditTask.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'
import TaskEditModal from '@/utils/task-edit-modal'
import { wrap } from 'lodash'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

describe('EditTask.vue', () => {
  /* it('add a new duration', () => {
    const value = 13000
    const modal = new TaskEditModal()
    modal.isVisible = true
    modal.taskId = 'IncorrectId'
    const wrapper = shallowMount(EditTask, {
      propsData: { modal }
    })
    wrapper.setData({ name: 'New Name' })
    const vm = wrapper.vm as any
    vm.addNewDuration()
    expect(wrapper.attributes('durations')).to.include([])
  })
  */
})
