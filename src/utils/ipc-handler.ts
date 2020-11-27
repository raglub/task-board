
import { IpcTemplate } from '@/utils/ipc-template'
import { IpcTypes } from './ipc-types'
import { TagsStore } from '@/db/stores/tagsStore'
import DurationsStore  from '@/db/stores/durationsStore'
import Tag from '@/models/tag'
import CreateTagDto from '@/dtos/create-tag-dto'
import { Duration } from '@/models/duration'
import { Guid16 } from '@/types/guid16'
const appVersion = require('../../package.json').version

export const IpcHandler: IpcTemplate = class IpcHandler {
  static tagsStore = new TagsStore()

  static durationsStore = new DurationsStore()

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

  static async [IpcTypes.CreateDuration] (duration: Duration): Promise<Duration> {
    return await this.durationsStore.insert(duration)
  }

  static async [IpcTypes.StartDuration] (taskId: Guid16): Promise<Duration> {
    const duration = new Duration()
    duration.taskId = taskId
    duration.from = Date.now()
    return await this.durationsStore.insert(duration)
  }

  static async [IpcTypes.GetVersion] (): Promise<string> {
    return appVersion
  }
}
