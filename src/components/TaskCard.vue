<template>
<div class="task-card d-flex">
  <span class="mt-1 flex-grow-1" style="font-size: 18px; word-break: break-all;">
    <b-icon-circle v-if="isTodo" variant="secondary"/>
    <b-icon-clock-fill v-if="isInProgress" variant="warning"/>
    <b-icon-check-circle-fill v-if="isDone" variant="success"/>
    <span class="ml-2">{{ task.name }}</span>
  </span>
    <b-badge pill class="task-row" variant="light">{{ duration }}</b-badge>
    <b-button v-if="task.isRunning" class="ml-1 task-row-btn" variant="secondary" @click="stopTask" size="sm">STOP</b-button>
    <b-button v-else class="ml-1 task-row-btn" size="sm" @click="startTask" variant="info">START</b-button>
    <b-dropdown size="sm" right variant="link" class="task-row" title="More options" toggle-class="text-decoration-none" no-caret>
      <template #button-content>
        <b-icon icon="three-dots-vertical"></b-icon>
      </template>
      <slot name="buttons"></slot>
    </b-dropdown>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Task from '@/models/task'
import { IpcChannel } from '@/utils/ipc-channel'
import { IpcInvoker } from '@/utils/ipc-invoker'
import { TaskStatuses } from '@/utils/taskStatuses'

@Component({
  components: {
  }
})
export default class TaskCard extends Vue {
  public duration = '';

  public interval: any;

  public name = '';

  @Prop()
  private task!: Task;

  async mounted () {
    this.loadView()
    this.refreshDurationContinuously()
  }

  destroyed () {
    clearInterval(this.interval)
  }

  get isTodo () {
    return this.task.status === TaskStatuses.Todo
  }

  get isInProgress () {
    return this.task.status === TaskStatuses.InProgress
  }

  get isDone () {
    return this.task.status === TaskStatuses.Done
  }

  async loadView () {
    this.duration = await IpcInvoker.invoke(IpcChannel.TotalDurationForTask, this.task._id)
  }

  public async startTask () {
    await IpcInvoker.invoke(IpcChannel.StartTask, this.task._id)
    this.$emit('refreshTasks')
    this.task.isRunning = true
    this.refreshDurationContinuously()
  }

  public async stopTask () {
    await IpcInvoker.invoke(IpcChannel.StopTask, this.task._id)
    clearInterval(this.interval)
    this.task.isRunning = false
  }

  private async refreshDurationContinuously () {
    if (this.task !== null) {
      if (this.task.isRunning === true) {
        this.interval = setInterval(async () => {
          this.duration = await IpcInvoker.invoke(IpcChannel.TotalDurationForTask, this.task._id)
        }, 1000)
      }
    }
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

.task-row-btn {
  height: 30px;
  min-width: 60px;
}

.task-row {
  height: 30px;
  font-size: 18px;
}
</style>
