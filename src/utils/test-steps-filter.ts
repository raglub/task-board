import { Guid16 } from '@/types/guid16'

export default class TestStepFilter {
    public showClosed: boolean = false

    public selectedTagIds: Guid16[] = []
    
    public searchText: string = ''
}