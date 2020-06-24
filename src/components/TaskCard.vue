<template>
 <b-card bg-variant="dark" text-variant="white" no-body>
  <b-card-header>
    <span>{{ task.name }} ({{ duration}})</span>
    <b-button class="float-right ml-1" variant="warning" size="sm">Edit</b-button>
    <b-button v-if="isActive" class="float-right ml-1" variant="danger" @click="stopTask" size="sm">STOP</b-button>
    <b-button v-else class="float-right ml-1" size="sm" @click="startTask" variant="success">START</b-button>
  </b-card-header>
  <b-card-body>
    ...
  </b-card-body>
</b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from "../utils/task";
import { TasksDb } from '../utils/tasksDb'

@Component
export default class NewTask extends Vue {
  public name: string = '';

  public duration: string = '00:00';

  public isActive: boolean = false;

  public interval: any;

  @Prop()
  private task!: Task;

  constructor() {
    super();
    this.duration = this.task.totalDuration();
  }

  public async startTask()
  {
    this.task.start();
    
    this.interval = setInterval(() => {
        this.duration = this.task.totalDuration();
    }, 1000);
    await new TasksDb().update(this.task);
    this.isActive = true; 
  }

  public async stopTask()
  {
    this.task.stop();
    clearInterval(this.interval);
    await new TasksDb().update(this.task);
    this.isActive = false;
  }
}
</script>

<style scoped lang="scss">

</style>