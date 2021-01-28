const Datastore = require('nedb-promises')

import { plainToClass } from "class-transformer";
import Tag from "@/models/tag";
import RootDir from '@/utils/rootDir';
import CreateTagDto from '@/dtos/create-tag-dto';
var path = require('path');

export class TagsStore
{
	static db: any

	constructor()
	{
		if (!TagsStore.db) {
			let dbPath = RootDir.combine('db/tags.db')
			if(process.env.NODE_ENV === 'test')
			{
				dbPath = RootDir.combine('db/tasks.test.db')
			}
			TagsStore.db = new Datastore({
				filename: dbPath,
				autoload: true 
			});
		}
	}

	async findAllAsync() : Promise<Tag[]>
	{
		let result: Tag[] = await TagsStore.db.find({});
		result.sort((a, b) => a.name.localeCompare(b.name))
		return result;
    }

	public async insert( tag: CreateTagDto ) : Promise<Tag>
	{
		let newTag = new Tag()
		newTag._id = undefined as any
		newTag.description = tag.description
		newTag.name = tag.name
		newTag = await TagsStore.db.insert( newTag );
		return newTag;
    }
}