<template>
  <b-container>
    <h1>About</h1>
    <p>
      <strong>Version: </strong>{{ version }}
    </p>
    <p>
      <strong>Commit: </strong>abcdef
    </p>
  </b-container>
</template>

<script lang="ts">
import { IpcChannel } from '@/utils/ipc-channel'
import { IpcInvoker } from '@/utils/ipc-invoker'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
})
export default class About extends Vue {
  public version = ''

  mounted () {
    this.loadView()
  }

  async loadView () {
    this.version = await IpcInvoker.invoke(IpcChannel.GetVersion)
    await IpcInvoker.invoke(IpcChannel.MigrateDurationsToDurationsStore)
  }
}
</script>
