const Datastore = require('nedb-promises')

import RootDir from '@/utils/rootDir';
import { Duration } from '@/models/duration';
import { Guid16 } from '@/types/guid16';
import { DateTimeConverter } from '@/utils/dateTimeConverter';
var path = require('path');

export default class DurationsStore
{
	static db: any

	constructor()
	{
		if (!DurationsStore.db) {
			let dbPath = RootDir.combine('db/durations.db')
			if(process.env.NODE_ENV === 'test')
			{
				dbPath = RootDir.combine('db/durations.test.db')
			}
			DurationsStore.db = new Datastore({
				filename: dbPath,
				autoload: true 
			});
		}
	}

	public async insert( duration: Duration ) : Promise<Duration>
	{
		duration._id = undefined as any
		duration = await DurationsStore.db.insert( duration );
		return duration;
	}

	public async update( duration: Duration ) : Promise<any>
	{
		if(duration._id === undefined)
			throw "Id for task is undefined";
		await DurationsStore.db.update( { _id: duration._id }, duration );
	}
	
	public async findAllForTaskId( taskId: Guid16 ) : Promise<Duration[]>
	{
		return await DurationsStore.db.find({"taskId": taskId});
	}
	
	public async findFromTo(from: Date, to: Date) : Promise<Duration[]>
	{
		var converter = new DateTimeConverter();
		var startDate = converter.toUnix(from);
		var endDate = converter.toUnix(to);
		var result : Duration[] = await DurationsStore.db.find({
			"from" : {$gte : startDate},
			$not: {"to" : {$gt : endDate}}});
		return result;
	}
}