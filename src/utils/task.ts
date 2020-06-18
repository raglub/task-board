import { Duration } from "./duration";
import { plainToClass } from "class-transformer";

export class Task
{
	name : string;
	description : string | undefined;
	_id : string | undefined;
	parentId : string | undefined;

	durations : Duration[];

	isClosed : boolean | null;

	constructor( name="none" )
	{
		this.name = name;
		this.description = undefined;
		this._id = undefined;
		this.parentId = undefined;
		this.durations = [];
		this.isClosed = false;
	}
	
	static plainToClass(plain : any) : Task
	{
		var result = plainToClass(Task, plain)[0];
		var durations: Duration[] = [];
		result.durations.forEach(function (duration : Duration) {
			var newDuration = plainToClass(Duration, duration);
			durations.push(newDuration);
		});
		result.durations = durations;
		return result;
	}

	isActive() : boolean
	{
		if( this.durations.length > 0 )
		{
			var duration = this.durations[this.durations.length - 1];
			if( duration.to == undefined )
			{
				return true;
			}
		}
		return false;
	}

	start() : void
	{
		var duration = new Duration();
		duration.from = Date.now();
		if( this.durations == undefined )
		{
			this.durations = [];
		}
		this.durations.push( duration );
	}

	stop() : void
	{
		if( this.durations.length > 0 )
		{
			var duration = this.durations[this.durations.length - 1];
			if( duration.to == undefined )
			{
				duration.to = Date.now();
			}
			return;
		}
	}

	totalDuration() : string
	{
		var value = 0;
        
		this.durations.forEach( function( duration : Duration)
		{
			if( duration.to == undefined || duration.to == null )
			{
				value += Date.now() - duration.from;
			}
			else
			{
				value += duration.to - duration.from;
			}
		} );
            
		return this.toHHMMSS( value/1000 );
	}

	toHHMMSS( secs : number ) : string
	{
		var sec_num = secs;//parseInt( secs, 10 );
		var hours   = Math.floor( sec_num / 3600 );
		var minutes = Math.floor( sec_num / 60 ) % 60;
		var seconds = sec_num % 60;
    
		return [ hours,minutes,seconds ]
			.map( v => v < 10 ? "0" + v : v )
			.filter( ( v,i ) => v !== "00" || i > 0 )
			.join( ":" );
	}
}