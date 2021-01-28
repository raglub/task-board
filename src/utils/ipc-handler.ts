
import { IpcTemplate } from '@/utils/ipc-template'
import { IpcTypes } from './ipc-types'
import { TagsStore } from '@/db/stores/tagsStore'
import DurationsStore  from '@/db/stores/durationsStore'
import Tag from '@/models/tag'
const appVersion = require('../../package.json').version

export const IpcHandler: IpcTemplate = class IpcHandler {
  static tagsStore = new TagsStore()

  static durationsStore = new DurationsStore()

  static async [IpcTypes.GetAllTags] (): Promise<Tag[]> {
    return await this.tagsStore.findAllAsync()
  }

  static async [IpcTypes.GetVersion] (): Promise<string> {
    return appVersion
  }
}
