<template>
 <b-card bg-variant="dark" text-variant="white" no-body>
  <b-card-header>
    <span class="align-middle">
    <span v-if="task.isClosed" class="text-danger"><del>{{ task.name }}</del></span>
    <span v-else>{{ task.name }}</span>
    <b-badge class="ml-2">{{ duration }}</b-badge></span>
    <div class="float-right ml-1"><slot name="buttons"></slot></div>
    <b-button v-if="task.isRunning" class="float-right ml-1" variant="danger" @click="stopTask" size="sm">STOP</b-button>
    <b-button v-else class="float-right ml-1" size="sm" @click="startTask" variant="success">START</b-button>
  </b-card-header>
  <b-card-body>
    {{ task.description }}
  </b-card-body>
</b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import Task from "@/models/task";
import { RemoteTasksStore } from '@/db/stores/remoteTasksStore'
import { ipcRenderer } from 'electron';
import { IpcInvoker } from '@/utils/ipc-invoker';
import { Duration } from '@/models/duration';
import TypedIpcRenderer from '@/utils/typed-ipc-renderer'
import { IpcChannel } from '@/utils/ipc-channel';

@Component({
  components: {
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
    await TypedIpcRenderer.invoke(IpcChannel.StartTask, this.task._id)
    this.task.isRunning = true
    this.interval = setInterval(async () => {
        this.duration = await TypedIpcRenderer.invoke(IpcChannel.TotalDurationForTask, this.task._id)
    }, 1000);
    // await this.tasksStore.update(this.task);  
  }

  public async stopTask()
  {
    const result = await TypedIpcRenderer.invoke(IpcChannel.StopTask, this.task._id)
    clearInterval(this.interval);
    this.task.isRunning = false;
    // await this.tasksStore.update(this.task);
  }
}
</script>

<style scoped lang="scss">

</style>