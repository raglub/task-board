import { Guid16 } from '@/types/guid16'

export default class TaskFilter {
    public page = 1

    public perPage = 6

    public showClosed = false

    public tagIds: Guid16[] = []

    public searchText = ''
}
