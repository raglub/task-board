import { Guid16 } from '@/types/guid16'
import { TaskStatuses } from '@/utils/taskStatuses'
import { DurationEdit } from './duration-edit'

export default class TaskEdit {
  name = ''

  description: string | undefined = undefined

  _id: Guid16 = ''

  durations: DurationEdit[] = []

  isClosed = false;

  isRunning = false

  tagIds: string[] = []

  status = TaskStatuses.Todo
}
