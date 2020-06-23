const Datastore = window.require('nedb-promises')

import { plainToClass } from "class-transformer";
import { Task } from "./task";
import { DateTimeConverter } from "./dateTimeConverter";
var path = require('path');
var dbPath = path.resolve(__dirname) + "/db/tasks.db";
if(process.env.NODE_ENV === 'test')
{
	dbPath = path.resolve(__dirname) + "/db/test-tasks.db";
}

let db = new Datastore({
	filename: dbPath,
	autoload: true 
});

export class TasksDb
{   
	query( pkgs: any, query : any ) : Promise<Task[]> {
		return new Promise( ( resolve, reject )=> {
			pkgs.find( query ).exec( ( error : any, result : Task[] )=>{
				if ( error !== null ) reject( error );
				else resolve( result );
			} );
		} );
	}

	async findByDay(year : number, month : number, day : number) : Promise<Task[]>
	{
		var result : Task[] = [];
		var converter = new DateTimeConverter();
		var from = converter.toUnix(new Date(year, month, day));
		var rawTasks : Task[] = await this.query( db, {"durations.from" : {$gte : from}});
		rawTasks.forEach( function( rawTask : any){
			var task = Task.plainToClass( rawTask );
			result.push( task );
		} );
		return result;
	}

	async findAllAsync() : Promise<Task[]>
	{
		var result : Task[] = [];
        var rawTasks : any = await db.find({});// await this.query( db, {} );
        result = plainToClass(Task, rawTasks);
		return result;
    }
    
	async findAsync( id : string) : Promise<Task>
	{
		var tasks = ( await this.query( db, { _id: id } ) );
		var rawTask = tasks[0];
		let task = Task.plainToClass(rawTask);
		return task;
	}

	///**
	// * @description Updates exising Task to database.
	// * @param {string} id
	// * @param {Task} task 
	// */
	public update( id : string, task : Task )
	{
		db.update( { _id: id }, task );
	}

	///**
	// * @description Inserts a new Task to database.
	// * @param {Task} task 
	// */
	public async insert( task : Task ) : Promise<Task>
	{
		let rawTask: Task = await db.insert( task );
		task._id = rawTask._id;
		return task;
    }
}