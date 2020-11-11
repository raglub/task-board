
import { IpcTemplate } from '@/utils/ipc-template'
import { IpcTypes } from './ipc-types'
import { TagsStore } from '@/db/stores/tagsStore'
import Tag from '@/models/tag'

export const IpcHandler: IpcTemplate = class IpcHandler {
  static tagsStore = new TagsStore()

  static async [IpcTypes.CreateTag] (name: string): Promise<Tag> {
    const tag = new Tag()
    tag.name = name
    await this.tagsStore.insert(tag)
    return tag
  }
}
