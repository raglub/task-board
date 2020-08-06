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
      <b-row v-for="task in tasks" class="mb-2 mt-2" :key="task._id" v-show="canShowTask(task)">
        <b-col>
          <TaskCard v-bind:task="task" @stopRunningTasks="stopRunningTasks" />
        </b-col>
      </b-row>
      <new-task @addTask="addTask" />
    </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router'
import { Task } from "../utils/task";
import NewTask from '@/components/NewTask.vue'
import TaskCard from '@/components/TaskCard.vue'
import { RemoteTasksStore } from '@/db/stores/remoteTasksStore'

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

  private tasksStore: RemoteTasksStore;

  public async loadTasks()
  {
    const tasksStore = new RemoteTasksStore()
    this.tasks = await tasksStore.findAll();
  }

  constructor() {
    super();
    this.tasksStore = new RemoteTasksStore()
    this.loadTasks();
    window.addEventListener('beforeunload', this.beforeunload)
  }
  
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    console.log("route");
  }

  public async addTask(value: string)
  {
    let task = new Task();
    task.name = value;
    task = await this.tasksStore.insert(task);
    this.tasks.push(task);
  }

  public beforeunload(event: any) {
    this.stopRunningTasks();
  }

  public canShowTask(task: Task): boolean
  {
    if(task.isClosed)
      return false;
    if(this.searchText === '')
      return true;
    return task.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
  }

  public async searchTasks()
  {
    console.log(this.searchText);
  }

  public stopRunningTasks()
  {
    for(var i=0; i < this.tasks.length; i++)
    {
      this.tasks[i].stop()
    }
  }
}
</script>

<style scoped lang="scss">

</style>