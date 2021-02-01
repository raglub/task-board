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
          <b-button variant="warning" class="float-right pl-1" size="sm" v-b-modal.modal-new-task>Add Task</b-button>
          <b-button variant="warning" class="float-right" size="sm" v-b-modal.modal-new-tag>Add Tag</b-button>
        </b-col>
      </b-row>
      <b-row class="mb-1 mt-2">
        <b-col>
          <tag-list v-model="selectedTagIds"></tag-list>
        </b-col>
      </b-row>
      <b-form-checkbox
        v-model="filter.showClosed"
      >
        Show closed
      </b-form-checkbox>
      <b-row v-for="task in tasks" class="mb-2 mt-2" :key="task._id" v-show="canShowTask(task)">
        <b-col>
          <TaskCard v-bind:task="task" @stopRunningTasks="stopRunningTasks">
            <template v-slot:buttons>
              <b-button variant="warning" size="sm" @click="editTask(task._id)">Edit</b-button>
            </template>
          </TaskCard>
        </b-col>
      </b-row>
      <new-task @addTask="addTask"/>
      <edit-task :modal="taskEditModalData" />
      <new-tag/>
    </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router'
import Task from "@/models/task";
import NewTask from '@/components/NewTask.vue'
import NewTag from '@/components/NewTag.vue'
import TaskCard from '@/components/TaskCard.vue'
import TagList from '@/components/TagList.vue'
import EditTask from '@/components/EditTask.vue'
import { Actions } from '@/store/actions';
import { Guid16 } from '@/types/guid16';
import TestStepFilter from '@/utils/test-steps-filter'
import TaskEditModal from '@/utils/task-edit-modal';

@Component({
  components: {
    NewTask,
    TaskCard,
    NewTag,
    EditTask,
    TagList
  }
})
export default class Board extends Vue {
  @Prop() private msg!: string;

  public searchText: string = "";
  public tasks: Task[] = [];
  public isLoading: boolean = false;

  public taskEditModalData = new TaskEditModal()

  public filter: TestStepFilter

  public canShowAddTaskModal = false;

  public selectedTagIds: Guid16[] = []

  public async loadTasks()
  {
    this.tasks = await Actions.loadTasks(this, undefined)
  }

  constructor() {
    super();
    this.filter = new TestStepFilter()
  }
  
  mounted() {
    this.loadTasks();
    window.addEventListener('beforeunload', this.beforeunload)
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    console.log("route");
  }

  public async addTask(task: Task)
  {
    this.tasks.push(task);
  }

  public async editTask(taskId: Guid16)
  {
    this.taskEditModalData.isVisible = true
    this.taskEditModalData.taskId = taskId
  }

  public beforeunload(event: any) {
    this.stopRunningTasks();
  }

  public canShowTask(task: Task): boolean
  {
    if(task.isClosed && !this.filter.showClosed)
      return false;

    let tagIsSelected = false
    if (this.selectedTagIds.length > 0) {
      this.selectedTagIds.forEach(id => {
        if (task.tagIds.indexOf(id) > -1) {
          tagIsSelected = true
          return
        }
      });
      if (!tagIsSelected) {
        return false
      }
    }
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
      // this.tasks[i].stop()
    }
  }
}
</script>

<style scoped lang="scss">

</style>