<template>
  <b-modal size="lg" :id="'modal-edit-task'" v-model="modalShow"
    title="Edit Task"
    @show="showModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
  <b-form-group
      label="Name:"
      label-for="input-1"
    >
    <b-form-input
      id="input-1"
      v-model="name"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Enter your name"
      trim
    ></b-form-input>
  </b-form-group>

  <b-form-group
      label="Description:"
      label-for="textarea-description"
    >
    <b-form-textarea
      id="textarea-description"
      v-model="description"
      placeholder="Enter description"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
  </b-form-group>
  <tag-list v-model="selectedTagIds"></tag-list>
  <b-form-group class="" label="Status:">
    <b-form-select v-model="status" :options="statuses"></b-form-select>
  </b-form-group>
  <b-form-group class="" label="Durations:">
    <div v-for="duration in durations" :key="duration._id" class="d-flex">
      <div class="p-1 w-100 d-inline-flex" v-if="duration.action!=='delete'">
        <label class="m-2 align-self-center">From</label>
        <DateTime class="align-self-center" v-model="duration.from" @afterUpdate="updateDuration(duration)" />
        <label class="m-2 ml-3 align-self-center" align-self-center>To</label>
        <DateTime class="align-self-center" v-model="duration.to" @afterUpdate="updateDuration(duration)" />
      </div>
      <div class="flex-shrink-1" v-if="duration.action!=='delete'">
        <b-button @click="deleteDuration(duration)" title="Delete duration" class="btn btn-danger mt-1">
          <b-icon-trash2-fill/>
        </b-button>
      </div>
    </div>
    <b-button class="float-right" variant="info" @click="addNewDuration">Add Duration</b-button>
  </b-form-group>
  <b-form-checkbox
    id="checkbox-1"
    v-model="isClosed"
    name="checkbox-1"
    :value="true"
    :unchecked-value="false"
  >
    Is Closed
  </b-form-checkbox>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Task from '@/models/task'
import { Duration } from '@/models/duration'
import DateTime from './DateTime.vue'
import TagList from '@/components/TagList.vue'
import { Guid16 } from '@/types/guid16'
import TaskEditModal from '@/utils/task-edit-modal'
import TaskEdit from '@/models/task-edit'
import { IpcInvoker } from '@/utils/ipc-invoker'
import { IpcChannel } from '@/utils/ipc-channel'
import { DurationEdit } from '@/models/duration-edit'
import { TaskStatuses } from '@/utils/taskStatuses'

@Component({
  components: {
    DateTime,
    TagList
  }
})
export default class EditTask extends Vue {
  public description: string | undefined = ''

  public durations: DurationEdit[] = []

  public name = ''

  public isClosed = false;

  @Prop()
  private modal!: TaskEditModal

  private status: TaskStatuses = TaskStatuses.Todo

  private statuses: any[] = [
    { value: TaskStatuses.Todo, text: 'To do' },
    { value: TaskStatuses.InProgress, text: 'In progress' },
    { value: TaskStatuses.Done, text: 'Done' }
  ]

  private task: Task | undefined

  public selectedTagIds: Guid16[] = []

  get modalShow () {
    if (this.modal) {
      return this.modal.isVisible
    }
    return false
  }

  set modalShow (value: boolean) {
    if (this.modal) {
      this.modal.isVisible = value
    }
  }

  mounted () {
    this.loadView()
  }

  async addNewDuration () {
    const duration = {
      from: Date.now(),
      to: Date.now(),
      taskId: this.modal.taskId,
      action: 'new'
    } as DurationEdit
    this.durations.push(duration)
  }

  async loadView () {
    if (this.modal.taskId) {
      const task = await IpcInvoker.invoke(IpcChannel.FindOneTask, this.modal.taskId)
      const durations = await IpcInvoker.invoke(IpcChannel.FindDurationsForTask, this.modal.taskId)
      this.selectedTagIds.length = 0
      this.selectedTagIds.push(...task.tagIds)
      this.task = task
      this.description = this.task.description
      this.durations = durations as DurationEdit[]
      this.isClosed = this.task.isClosed
      this.name = this.task.name
      this.status = this.task.status
    }
  }

  public handleOk () {
    if (this.task) {
      const taskEdit = new TaskEdit()
      taskEdit._id = this.task._id
      taskEdit.name = this.name
      taskEdit.description = this.description
      taskEdit.durations = this.durations
      taskEdit.isClosed = this.isClosed
      taskEdit.tagIds = this.selectedTagIds
      taskEdit.status = this.status
      IpcInvoker.invoke(IpcChannel.UpdateTask, taskEdit)
      this.$emit('refreshTasks')
    }
  }

  public resetModal () {
    // this.description = this.task.description;
    // this.durations = [...this.task.durations];
    // this.isClosed = this.task.isClosed;
    // this.name = this.task.name;
  }

  async showModal () {
    await this.loadView()
  }

  public deleteDuration (duration: DurationEdit) {
    const index = this.durations.indexOf(duration)
    if (index > -1) {
      this.durations.splice(index, 1)
    }
    duration.action = 'delete'
    this.durations.splice(index, 0, duration)
  }

  public updateDuration (duration: DurationEdit) {
    if (duration.action === null) {
      duration.action = 'edit'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
