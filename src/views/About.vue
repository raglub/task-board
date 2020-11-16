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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
const appVersion = window.require('./package.json').version

@Component({
})
export default class About extends Vue {
  public version = appVersion

  constructor() {
    super();
  }
}
</script>
