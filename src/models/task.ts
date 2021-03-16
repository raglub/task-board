import { plainToClass } from 'class-transformer'
import { Guid16 } from '@/types/guid16'
import { TaskStatuses } from '@/utils/taskStatuses'

export default class Task {
  name: string;
  description: string | undefined;
  _id: Guid16;
  parentId: string | undefined;

  isClosed = false;

  isRunning: boolean;

  status: TaskStatuses;

  tagIds: string[] = []

  constructor (name = 'none') {
    this.name = name
    this._id = ''
    this.description = undefined
    this.parentId = undefined
    this.isClosed = false
    this.isRunning = false
    this.status = TaskStatuses.Todo
  }

  static cast (rawTask: Task): Task {
    return Object.assign(new Task(), rawTask)
  }

  static plainToClass (plain: any): Task {
    const result = plainToClass(Task, plain)[0]
    return result
  }
}
