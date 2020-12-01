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
  <b-form-group
      label="Durations:"
    >
    <div v-for="(duration, index) in durations" :key="JSON.stringify(duration)" class="form-row ml-3 mb-3">
      <div class="mr-2 mt-2">
        <label>From</label>
      </div>
      <div class="col-md-5">
        <DateTime :datetime.sync="duration.from" />
      </div>
      <div class="mr-2 ml-1 mt-2">
        <label>To</label>
      </div>
      <div class="col">
        <DateTime :datetime.sync="duration.to" />
      </div>
      <div>
        <button @click="deleteDurationAt(index)" class="btn btn-danger"><b-icon-trash-fill></b-icon-trash-fill></button>
      </div>
    </div>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import Task from "@/models/task";
import { Duration } from "@/utils/duration";
import { RemoteTasksStore } from '@/db/stores/remoteTasksStore'
import DateTime from './DateTime.vue'
import TagList from '@/components/TagList.vue'
import Tag from '@/models/tag';
import { Guid16 } from '@/types/guid16'
import { IpcInvoker } from '@/utils/ipc-invoker';
import TaskEditModal from '@/utils/task-edit-modal'

@Component({
  components: {
    DateTime,
    TagList
  }
})
export default class EditTask extends Vue {
  public description: string | undefined = '';

  public durations: Duration[] = [];

  public name: string = '';

  public isClosed: boolean = false;

  public tasksStore: RemoteTasksStore;

  @Prop()
  private modal!: TaskEditModal;

  private task: Task | undefined;

  public selectedTagIds: Guid16[] = []

  get modalShow () {
    if (!!this.modal) {
      return this.modal.isVisible
    }
    return false
  }

  set modalShow(value: boolean) {
    if (this.modal) {
      this.modal.isVisible = value
    }
  }

  constructor() {
    super();
    this.tasksStore = new RemoteTasksStore();
  }

  mounted() {
    this.loadView()
  }

  async loadView() {
    if (this.modal.taskId) {
      this.task = await this.tasksStore.findOne(this.modal.taskId)
      this.selectedTagIds.length = 0
      this.selectedTagIds.push(...this.task.tagIds)
      this.description = this.task.description;
      this.durations = [] //[...this.task.durations];
      this.isClosed = this.task.isClosed;
      this.name = this.task.name;
    }
  }

  public handleOk(bvModalEvt: any) {
    //this.task.name = this.name
    //this.task.description = this.description;
    //this.task.durations = this.durations;
    //this.task.isClosed = this.isClosed;
    //this.task.tagIds.length = 0
    //this.task.tagIds.push(...this.selectedTagIds)
    //this.tasksStore.update(this.task);
  }

  public resetModal() {
    //this.description = this.task.description;
    //this.durations = [...this.task.durations];
    //this.isClosed = this.task.isClosed;
    //this.name = this.task.name;
  }

  async showModal() 
  {
    await this.loadView()
  }

  public deleteDurationAt(index: number)
  {
    this.$delete(this.durations, index)
  }
}
</script>

<style scoped lang="scss">

</style>
