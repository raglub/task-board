const Datastore = require('nedb-promises')

import { plainToClass } from "class-transformer";
import Task from "@/models/task";
import { DateTimeConverter } from "../../utils/dateTimeConverter";
import RootDir from '@/utils/rootDir';
import DurationsStore from "./durationsStore";
import { Duration } from "@/utils/duration";
var path = require('path');

export class TasksStore
{
	static db: any

	constructor()
	{
		if(!TasksStore.db){
			var dbPath = RootDir.combine('db/tasks.db')
			if(process.env.NODE_ENV === 'test')
			{
				dbPath = RootDir.combine('db/tasks.test.db')
			}
			TasksStore.db = new Datastore({
				filename: dbPath,
				autoload: true 
			});
		}
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
		var rawTasks : Task[] = await TasksStore.db.find({
			"durations.from" : {$gte : startDate},
			$not: {"durations.to" : {$gt : endDate}}});
		result = plainToClass(Task, rawTasks);
		return result;
	}

	async findAllAsync() : Promise<Task[]>
	{
		var result : Task[] = [];
		const durationStore = new DurationsStore()
				var rawTasks : Task[] = await TasksStore.db.find({})
				await rawTasks.forEach(async (task) =>
					task.durations = (await durationStore.findAllForTaskId(task._id)) as any as Duration[]
				)
        result = plainToClass(Task, rawTasks)
		return result;
    }
    
	public async findAsync( id : string) : Promise<Task>
	{
		const rawTask = await TasksStore.db.find({ _id: id });
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
		await TasksStore.db.update( { _id: task._id }, task );
	}

	///**
	// * @description Inserts a new Task to database.
	// * @param {Task} task 
	// */
	public async insert( task: Task ) : Promise<Task>
	{
		task._id = undefined as any
		let rawTask: Task = await TasksStore.db.insert( task );
		task._id = rawTask._id;
		return task;
    }
}