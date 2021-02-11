<template>
<div class="task-card d-flex">
  <span class="mt-1" style="font-size: 18px;">
    <b-icon v-if="task.isClosed" variant="info" icon="check-circle-fill"></b-icon>
    <b-icon v-else variant="info" icon="check-circle"></b-icon>
    <span class="ml-2">{{ task.name }}</span>
  </span>
  <span class="ml-auto">
    <b-badge pill style="font-size: 18px;" variant="light">{{ duration }}</b-badge>
    <b-button v-if="task.isRunning" class="ml-1" variant="secondary" @click="stopTask" size="sm">STOP</b-button>
    <b-button v-else class="ml-1" size="sm" @click="startTask" variant="info">START</b-button>
    <b-dropdown right variant="link" title="More options" toggle-class="text-decoration-none" no-caret>
      <template #button-content>
        <b-icon icon="three-dots-vertical"></b-icon>
      </template>
      <slot name="buttons"></slot>
    </b-dropdown>
  </span>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import Task from "@/models/task";
import { IpcChannel } from '@/utils/ipc-channel';
import { IpcInvoker } from '@/utils/ipc-invoker';

@Component({
  components: {
  }
})
export default class TaskCard extends Vue {
  public duration: string = '';

  public interval: any;

  public name: string = '';

  @Prop()
  private task!: Task;

  constructor() {
    super()
    this.loadView()
  }

  async loadView() {
    this.duration = await IpcInvoker.invoke(IpcChannel.TotalDurationForTask, this.task._id)
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
    await IpcInvoker.invoke(IpcChannel.StartTask, this.task._id)
    this.task.isRunning = true
    this.interval = setInterval(async () => {
        this.duration = await IpcInvoker.invoke(IpcChannel.TotalDurationForTask, this.task._id)
    }, 1000);
    // await this.tasksStore.update(this.task);
  }

  public async stopTask()
  {
    const result = await IpcInvoker.invoke(IpcChannel.StopTask, this.task._id)
    clearInterval(this.interval);
    this.task.isRunning = false;
    // await this.tasksStore.update(this.task);
  }
}
</script>

<style scoped lang="scss">
.task-card {
  background-color: #fff;
  padding: 10px 0 10px 10px !important;
  border-bottom: 1px solid #aaa;
  border-radius: 0 0 0 10px;
}
</style>