<template>
    <b-container class="board">
      <h2>Board</h2>
      <b-row class="mb-1 mt-2">
        <b-col>
          <b-nav-form>
            <b-form-input size="sm" v-model="searchText" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" @click="searchTasks" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-col>
        <b-col>  
          <b-button variant="warning" class="float-right" size="sm" v-b-modal.modal-new-task>Add Task</b-button>
        </b-col>
      </b-row>
      <b-row v-for="task in tasks" class="mb-2 mt-2" :key="task._id" v-show="canShowTask(task.name)">
        <b-col>
          <TaskCard v-bind:task="task" />
        </b-col>
      </b-row>
      <NewTask @addTask="addTask" />
    </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from "../utils/task";
import NewTask from '@/components/NewTask.vue'
import TaskCard from '@/components/TaskCard.vue'
import { TasksDb } from '../utils/tasksDb'

@Component({
  components: {
    NewTask,
    TaskCard
  }
})
export default class Board extends Vue {
  @Prop() private msg!: string;

  public searchText: string = "";
  public tasks: Task[] = [];
  public isLoading: boolean = false;

  public canShowAddTaskModal = false;

  public async loadTasks()
  {
    let tasksDb = new TasksDb();
    this.tasks = await tasksDb.findAllAsync();
  }

  constructor() {
    super();
    this.loadTasks();
  }
  
  public async searchTasks()
  {
    console.log(this.searchText);

  }

  public canShowTask(name: string): boolean
  {
    if(this.searchText === '')
      return true;
    return name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
    //return this.searchText === name;

  }

  public async addTask(value: string)
  {
    let tasksDb = new TasksDb();
    let task = new Task();
    task.name = value;
    task = await tasksDb.insert(task);
    this.tasks.push(task);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>