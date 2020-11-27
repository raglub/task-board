import { Guid16 } from '@/types/guid16';

export class Duration
{
    _id: Guid16 = '';

	from: number = -1

	to: number | null = null
    
    taskId: Guid16 = ''   
}