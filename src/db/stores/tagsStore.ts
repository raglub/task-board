const Datastore = require('nedb-promises')

import { plainToClass } from "class-transformer";
import Tag from "@/models/tag";
import RootDir from '@/utils/rootDir';
var path = require('path');

export class TagsStore
{
	db: any

	constructor()
	{
		let dbPath = RootDir.combine('db/tags.db')
		if(process.env.NODE_ENV === 'test')
		{
			dbPath = RootDir.combine('db/tasks.test.db')
		}
		this.db = new Datastore({
			filename: dbPath,
			autoload: true 
		});
	}

	async findAllAsync() : Promise<Tag[]>
	{
		let result: Tag[] = await this.db.find({});
		result.sort((a, b) => a.name.localeCompare(b.name))
		return result;
    }

	public async insert( tag: Tag ) : Promise<Tag>
	{
		let newTag: Tag = await this.db.insert( tag );
		tag._id = newTag._id;
		return tag;
    }
}