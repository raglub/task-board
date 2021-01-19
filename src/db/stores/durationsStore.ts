const Datastore = require('nedb-promises')

import RootDir from '@/utils/rootDir';
import { Duration } from '@/models/duration';
import { Guid16 } from '@/types/guid16';
var path = require('path');

export default class DurationsStore
{
	db: any

	constructor()
	{
		let dbPath = RootDir.combine('db/durations.db')
		if(process.env.NODE_ENV === 'test')
		{
			dbPath = RootDir.combine('db/durations.test.db')
		}
		this.db = new Datastore({
			filename: dbPath,
			autoload: true 
		});
	}

	public async insert( duration: Duration ) : Promise<Duration>
	{
		duration._id = undefined as any
		duration = await this.db.insert( duration );
		return duration;
	}

	public async update( duration: Duration ) : Promise<any>
	{
		if(duration._id === undefined)
			throw "Id for task is undefined";
		await this.db.update( { _id: duration._id }, duration );
	}
	
	public async findAllForTaskId( taskId: Guid16 ) : Promise<Duration[]>
	{
		return await this.db.find({"taskId": taskId});
  }
}