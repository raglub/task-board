import { Guid16 } from '@/types/guid16'
import { TaskStatus } from './taskStatus'

export default class TaskFilter {
    public page = 1

    public perPage = 6

    public showClosed = false

    public tagIds: Guid16[] = []

    public searchText = ''

    public statuses: TaskStatus[] = []
}
