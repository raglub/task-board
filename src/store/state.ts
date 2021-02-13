import Task from '@/models/task'

export interface RootState {
  counter: number;
  tasks: Task[];
}
