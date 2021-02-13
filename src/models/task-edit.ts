import { Duration } from '@/models/duration'
import { Guid16 } from '@/types/guid16'

export default class TaskEdit {
	name = ''

	description: string | undefined = undefined

	_id: Guid16 = ''

	durations: Duration[] = []

	isClosed = false;

	isRunning = false

	tagIds: string[] = []
}
