import { Guid16 } from '@/types/guid16'

export default class TestStepFilter {
    public showClosed = false

    public selectedTagIds: Guid16[] = []

    public searchText = ''
}
