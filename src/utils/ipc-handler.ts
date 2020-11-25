
import { IpcTemplate } from '@/utils/ipc-template'
import { IpcTypes } from './ipc-types'
import { TagsStore } from '@/db/stores/tagsStore'
import Tag from '@/models/tag'
import CreateTagDto from '@/dtos/create-tag-dto'
const appVersion = require('../../package.json').version

export const IpcHandler: IpcTemplate = class IpcHandler {
  static tagsStore = new TagsStore()

  static async [IpcTypes.CreateTag] (name: string): Promise<Tag> {
    const tag =  new CreateTagDto()
    tag.description = ''
    tag.name = name
    const newTag = await this.tagsStore.insert(tag)
    return newTag
  }

  static async [IpcTypes.GetAllTags] (): Promise<Tag[]> {
    return await this.tagsStore.findAllAsync()
  }

  static async [IpcTypes.GetVersion] (): Promise<string> {
    return appVersion
  }
}
