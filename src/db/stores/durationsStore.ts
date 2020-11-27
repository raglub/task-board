const Datastore = require('nedb-promises')

import RootDir from '@/utils/rootDir';
import { Duration } from '@/models/duration';
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
}