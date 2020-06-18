<template>
  <div class="board">
    <h1>{{ msg }}</h1>
    <p>
    <h2>Board<b-badge>1</b-badge></h2>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from "../utils/task";
import { TasksDb } from '../utils/tasksDb'

@Component
export default class Board extends Vue {
  @Prop() private msg!: string;

  public tasks: Task[] = [];
  public isLoading: boolean = false;

  public async loadTasks()
  {
    var tasksDb = new TasksDb();
    this.tasks = await tasksDb.findAllAsync();
  }

  constructor() {
    super();
    this.loadTasks();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
