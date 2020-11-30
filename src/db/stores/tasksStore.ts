const Datastore = require('nedb-promises')

import { plainToClass } from "class-transformer";
import Task from "@/models/task";
import { DateTimeConverter } from "../../utils/dateTimeConverter";
import RootDir from '@/utils/rootDir';
var path = require('path');

export class TasksStore
{
	db: any

	constructor()
	{
		var dbPath = RootDir.combine('db/tasks.db')
		if(process.env.NODE_ENV === 'test')
		{
			dbPath = RootDir.combine('db/tasks.test.db')
		}
		this.db = new Datastore({
			filename: dbPath,
			autoload: true 
		});
	}

	query( pkgs: any, query : any ) : Promise<Task[]> {
		return new Promise( ( resolve, reject )=> {
			pkgs.find( query ).exec( ( error : any, result : Task[] )=>{
				if ( error !== null ) reject( error );
				else resolve( result );
			} );
		} );
	}

	public async findFromTo(from: Date, to: Date) : Promise<Task[]>
	{
		var result : Task[] = [];
		var converter = new DateTimeConverter();
		var startDate = converter.toUnix(from);
		var endDate = converter.toUnix(to);
		var rawTasks : Task[] = await this.db.find({
			"durations.from" : {$gte : startDate},
			$not: {"durations.to" : {$gt : endDate}}});
		result = plainToClass(Task, rawTasks);
		return result;
	}

	async findAllAsync() : Promise<Task[]>
	{
		var result : Task[] = [];
        var rawTasks : any = await this.db.find({});// await this.query( db, {} );
        result = plainToClass(Task, rawTasks);
		return result;
    }
    
	public async findAsync( id : string) : Promise<Task>
	{
		const rawTask = await this.db.find({ _id: id });
		let task = Task.plainToClass(rawTask);
		return task;
	}

	///**
	// * @description Updates exising Task to database.
	// * @param {string} id
	// * @param {Task} task 
	// */
	public async update(task : Task )
	{
		if(task._id === undefined)
			throw "Id for task is undefined";
		await this.db.update( { _id: task._id }, task );
	}

	///**
	// * @description Inserts a new Task to database.
	// * @param {Task} task 
	// */
	public async insert( task: Task ) : Promise<Task>
	{
		let rawTask: Task = await this.db.insert( task );
		task._id = rawTask._id;
		return task;
    }
}