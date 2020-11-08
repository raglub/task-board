<template>
 <b-card bg-variant="dark" text-variant="white" no-body>
  <b-card-header>
    <span class="align-middle">{{ task.name }} <b-badge >{{ duration }}</b-badge></span>
    
    <b-button class="float-right ml-1" variant="warning" size="sm" @click="$bvModal.show('modal-edit-task-' + task._id)">Edit</b-button>
    <b-button v-if="task.isRunning" class="float-right ml-1" variant="danger" @click="stopTask" size="sm">STOP</b-button>
    <b-button v-else class="float-right ml-1" size="sm" @click="startTask" variant="success">START</b-button>
  </b-card-header>
  <b-card-body>
    {{ task.description }}
  </b-card-body>
  <EditTask :task="task" />
</b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import Task from "@/models/task";
import { RemoteTasksStore } from '@/db/stores/remoteTasksStore'
import EditTask from './EditTask.vue'

@Component({
  components: {
    EditTask,
  }
})
export default class TaskCard extends Vue {
  public duration: string = '';

  public interval: any;

  public name: string = '';

  public tasksStore: RemoteTasksStore

  @Prop()
  private task!: Task;

  constructor() {
    super();
    this.tasksStore = new RemoteTasksStore();
    this.duration = this.task.totalDuration();
  }

  @Watch('task.isRunning')
  async onIsRunningChanged(val: boolean, oldVal: boolean) {
    if(val == false && oldVal)
    {
      await this.stopTask();
    }
  }

  public async startTask()
  {
    this.$emit("stopRunningTasks");
    this.task.start();
    
    this.interval = setInterval(() => {
        this.duration = this.task.totalDuration();
    }, 1000);
    await this.tasksStore.update(this.task);
  }

  public async stopTask()
  {
    this.task.stop();
    clearInterval(this.interval);
    this.task.isRunning = false;
    await this.tasksStore.update(this.task);
  }
}
</script>

<style scoped lang="scss">

</style>