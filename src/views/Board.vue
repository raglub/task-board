<template>
    <b-container class="board">
      <h2>Board</h2>
      <b-row class="mb-1 mt-2">
        <b-col>
          <b-nav-form>
            <b-input-group size="sm">
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
              <b-form-input type="search" v-model="searchText" @input="refreshList" class="mr-sm-2" placeholder="Search"></b-form-input>
            </b-input-group>
          </b-nav-form>
        </b-col>
        <b-col>
          <b-dropdown right variant="link" title="More options" class="float-right" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <b-icon icon="three-dots-vertical"></b-icon>
            </template>
            <b-dropdown-item v-b-modal.modal-new-task>Add Task</b-dropdown-item>
            <b-dropdown-item v-b-modal.modal-new-tag>Add Tag</b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
      <b-row class="mb-0 mt-0">
        <b-col>
          <tag-list v-model="selectedTagIds" @input="refreshList"></tag-list>
        </b-col>
      </b-row>
      <b-row class="mb-0 mt-0">
        <b-col>
          <b-form-group label="Statuses:">
            <b-form-checkbox-group id="tags-group" v-model="statuses" @input="refreshList" name="flavour-2">
              <b-form-checkbox :value="TaskStatus.Todo">To do</b-form-checkbox>
              <b-form-checkbox :value="TaskStatus.InProgress">In progress</b-form-checkbox>
              <b-form-checkbox :value="TaskStatus.Done">Done</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-for="task in tasks" class="mb-2 mt-2" :key="task._id">
        <b-col>
          <TaskCard v-bind:task="task" @refreshTasks="refreshList">
            <template v-slot:buttons>
              <b-dropdown-item @click="editTask(task._id)">Edit Task</b-dropdown-item>
            </template>
          </TaskCard>
        </b-col>
      </b-row>
      <div class="mt-3">
        <b-pagination class="justify-content-center"
          v-model="currentPage"
          pills
          :per-page="filter.perPage"
          @input="refreshList"
          :total-rows="totalPages">
        </b-pagination>
      </div>
      <new-task @addTask="addTask"/>
      <edit-task :modal="taskEditModalData" @refreshTasks="refreshList" />
      <new-tag/>
    </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Task from '@/models/task'
import NewTask from '@/components/NewTask.vue'
import NewTag from '@/components/NewTag.vue'
import TaskCard from '@/components/TaskCard.vue'
import TagList from '@/components/TagList.vue'
import EditTask from '@/components/EditTask.vue'
import { Guid16 } from '@/types/guid16'
import TaskFilter from '@/utils/task-filter'
import TaskEditModal from '@/utils/task-edit-modal'
import { TaskStatus } from '@/utils/taskStatus'

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

  public currentPage = 1
  public totalPages = 1
  public searchText = ''
  public tasks: Task[] = []
  public isLoading = false;

  // necessary to use in template
  TaskStatus: any = TaskStatus;

  public taskEditModalData = new TaskEditModal()

  public filter: TaskFilter

  public canShowAddTaskModal = false

  public selectedTagIds: Guid16[] = []

  public statuses: TaskStatus[] = [TaskStatus.Todo, TaskStatus.InProgress]

  public async refreshList () {
    this.filter.searchText = this.searchText
    this.filter.page = this.currentPage
    this.filter.tagIds = this.selectedTagIds
    this.filter.statuses = this.statuses
    this.totalPages = await this.$store.direct.dispatch.countTasks(this.filter)
    const tasks = await this.$store.direct.dispatch.loadTasks(this.filter)
    this.tasks = tasks
  }

  constructor () {
    super()
    this.filter = new TaskFilter()
  }

  mounted () {
    this.refreshList()
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange () { // newVal: Route
    console.log('route')
  }

  public async addTask (task: Task) {
    this.tasks.push(task)
  }

  public async editTask (taskId: Guid16) {
    this.taskEditModalData.isVisible = true
    this.taskEditModalData.taskId = taskId
  }
}
</script>

<style scoped lang="scss">
</style>
