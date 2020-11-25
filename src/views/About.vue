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
import { IpcInvoker } from '@/utils/ipc-invoker';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
})
export default class About extends Vue {
  public version = ''

  constructor() {
    super();
  }

  mounted() {
    this.loadView()
  }

  async loadView() {
    this.version = await IpcInvoker.getVersion()
  }
}
</script>
