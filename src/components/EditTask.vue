<template>
  <b-modal size="lg" :id="'modal-edit-task-' + task._id"
    title="Edit Task"
    @show="resetModal"
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
  <b-form-group
      label="Durations:"
    >
    <div v-for="duration in durations" class="form-row ml-3 mb-3">
      <div class="mr-2 mt-2">
        <label>From</label>
      </div>
      <div class="col-md-5">
        <DateTime :datetime="duration.from" />
      </div>
      <div class="mr-2 ml-5 mt-2">
        <label>To</label>
      </div>
      <div class="">
        <DateTime :datetime="duration.to" />
      </div>
    </div>
  </b-form-group>
  <b-form-checkbox
    id="checkbox-1"
    v-model="isClosed"
    name="checkbox-1"
    value="accepted"
    unchecked-value="not_accepted"
  >
    Is Closed
  </b-form-checkbox>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from "../utils/task";
import { Duration } from "../utils/duration";
import { TasksDb } from '../utils/tasksDb'
import DateTime from './DateTime.vue'

@Component({
  components: {
    DateTime,
  }
})
export default class EditTask extends Vue {
  public description: string | undefined = '';

  public durations: Duration[] = [];

  public name: string = '';

  public isClosed: boolean = false;

  @Prop()
  private task!: Task;

  constructor() {
    super();
  }

  public handleOk(bvModalEvt: any) {
    this.task.name = this.name;
    this.task.description = this.description;
    this.task.durations = this.durations;
    this.task.isClosed = this.isClosed;
    new TasksDb().update(this.task);
  }

  public resetModal() {
    this.description = this.task.description;
    this.durations = this.task.durations;
    this.isClosed = this.task.isClosed;
    this.name = this.task.name;
  }
}
</script>

<style scoped lang="scss">

</style>