import { Guid16 } from '@/types/guid16'

export interface DurationEdit {
  _id: Guid16

  from: number

  to: number | null

  taskId: Guid16

  action: null | 'delete' | "edit" | 'new'
}
