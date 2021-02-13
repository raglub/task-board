import { Duration } from '@/utils/duration'
import { plainToClass } from 'class-transformer'
import { Guid16 } from '@/types/guid16'

export default class Task {
  name: string;
  description: string | undefined;
  _id: Guid16;
  parentId: string | undefined;

  durations: Duration[];

  isClosed = false;

  isRunning: boolean;

  tagIds: string[] = []

  constructor (name = 'none') {
    this.name = name
    this._id = ''
    this.description = undefined
    this.parentId = undefined
    this.durations = []
    this.isClosed = false
    this.isRunning = false
  }

  static cast (rawTask: Task): Task {
    return Object.assign(new Task(), rawTask)
  }

  static plainToClass (plain: any): Task {
    const result = plainToClass(Task, plain)[0]
    const durations: Duration[] = []
    result.durations.forEach(function (duration: Duration) {
      const newDuration = plainToClass(Duration, duration)
      durations.push(newDuration)
    })
    result.durations = durations
    return result
  }

  stop (): void {
    if (this.isRunning === true) {
      this.isRunning = false
      if (this.durations.length > 0) {
        const duration = this.durations[this.durations.length - 1]
        if (duration.to == null) {
          duration.to = Date.now()
        }
      }
    }
  }
}
