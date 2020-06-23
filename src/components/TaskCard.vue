<template>
 <b-card bg-variant="dark" text-variant="white" no-body>
  <b-card-header>
    <span>{{ task.name }} {{ task.duration}}</span>
    <b-button class="float-right ml-1" variant="warning" size="sm">Edit</b-button>
    <b-button v-if="isActive" class="float-right ml-1" variant="danger" size="sm">STOP</b-button>
    <b-button v-else class="float-right ml-1" size="sm" variant="success">START</b-button>
  </b-card-header>
  <b-card-body>
    ...
  </b-card-body>
</b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from "../utils/task";

@Component
export default class NewTask extends Vue {
  public name: string = '';
  public isActive: boolean = false;

  @Prop()
  private task!: Task;

  constructor() {
    super();
  }
}
</script>

<style scoped lang="scss">

</style>
