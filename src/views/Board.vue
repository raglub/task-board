<template>
  <div class="board">
    <div class="container-fluid">
    <h2>Board</h2>
      <div class="row mb-1 mt-1">
        <form>
          <div class="col">
          
            <div class="form-row align-items-center">
              <b-input-group>
                <b-form-input
                  v-model="searchText"
                  placeholder="Search"
                  size="sm"
                ></b-form-input>
                <b-input-group-append>
                  <b-button @click="searchTasks" size="sm" variant="primary">Search</b-button>
                </b-input-group-append>
              </b-input-group>
              <b-button variant="warning" size="sm" v-b-modal.modal-new-task>Add Task</b-button>
            </div>
          </div>
        </form>
      </div>
      <div class="row">
        <ul>
          <li v-for="task in tasks" :key="task._id" v-show="canShowTask(task.name)">
            {{ task.name }}
          </li>
        </ul>
      </div>
    </div>
    <NewTask @addTask="addTask" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from "../utils/task";
import NewTask from '@/components/NewTask.vue'
import { TasksDb } from '../utils/tasksDb'

@Component({
  components: {
    NewTask,
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