<template>
 <b-card bg-variant="dark" text-variant="white" no-body>
  <b-card-header>
    <span class="align-middle">{{ task.name }} <b-badge >{{ duration }}</b-badge></span>
    
    <b-button class="float-right ml-1" variant="warning" size="sm" @click="$bvModal.show('modal-edit-task-' + task._id)">Edit</b-button>
    <b-button v-if="isActive" class="float-right ml-1" variant="danger" @click="stopTask" size="sm">STOP</b-button>
    <b-button v-else class="float-right ml-1" size="sm" @click="startTask" variant="success">START</b-button>
  </b-card-header>
  <b-card-body>
    {{ task.description }}
  </b-card-body>
  <EditTask :task="task" />
</b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from "../utils/task";
import { TasksDb } from '../utils/tasksDb'
import EditTask from './EditTask.vue'

@Component({
  components: {
    EditTask,
  }
})
export default class TaskCard extends Vue {
  public duration: string = '';

  public interval: any;

  public isActive: boolean = false;

  public name: string = '';

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