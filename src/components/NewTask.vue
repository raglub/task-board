<template>
  <b-modal id="modal-new-task"
    title="New Task"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <div role="group">
    <label for="input-live">Name:</label>
    <b-form-input
      id="input-live"
      v-model="name"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Enter your name"
      trim
    ></b-form-input>
    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">
      Enter at least 3 letters
    </b-form-invalid-feedback>

    <!-- This is a form text block (formerly known as help block) -->
    <b-form-text id="input-live-help">Your full name.</b-form-text>
    <tag-list v-model="selectedTagIds"></tag-list>
  </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TagList from '@/components/TagList.vue'
import Task from '@/models/task'
import { Guid16 } from '@/types/guid16'
import { IpcChannel } from '@/utils/ipc-channel'
import { IpcInvoker } from '@/utils/ipc-invoker'

@Component({
  components: {
    TagList
  }
})
export default class NewTask extends Vue {
  public name = '';

  public selectedTagIds: Guid16[] = []

  public async handleOk () {
    const task = new Task()
    task.name = this.name
    task.tagIds = this.selectedTagIds
    const newTask = await IpcInvoker.invoke(IpcChannel.CreateTask, task)
    task._id = newTask._id
    this.$emit('addTask', task)
  }

  public resetModal () {
    this.name = ''
  }
}
</script>

<style scoped lang="scss">

</style>
