const Moment = require("moment");

export class DateTimeConverter
{
	/**
	 * @description Converts seconds to human readable dateTime format.
	 * @param {number} epochDateTime
	 * @returns {string} 
	 */
	toString( epochDateTime : number ) : string
	{
		return DateTimeConverter.toString(epochDateTime);
	}

	/**
	 * @description Converts seconds to human readable dateTime format.
	 * @param {number} epochDateTime
	 * @returns {string} 
	 */
	static toString (epochDateTime : number) : string
	{
		if( epochDateTime == undefined )
			return "";
		return Moment.unix(epochDateTime/1000).format('YYYY-MM-DD HH:mm:ss');
	}

    /**
	 * @description Converts seconds to pixels lenght.
	 * @param {number} epochDateTime
	 * @returns {number} 
	 */
	static toPixels ( epochDateTime : number) : number
	{
		if( epochDateTime == undefined )
		return 0;
		var date = new Date( epochDateTime );
		var timezoneOffset = new Date( 0 ).getTimezoneOffset() * 60000;
		date = new Date(date.getTime() + timezoneOffset);

		var hours = date.getHours();
		var minutes = date.getMinutes() / 5;
		var result = hours * 12 + minutes;
		return result;
	}

	toUnix( dateTime : Date ) : number | null
	{
		return DateTimeConverter.toUnix(dateTime);
	}

	/**
	 * @description Converts dateTime format to seconds (epoch dateTime).
	 * @param {string} dateTime
	 * @returns {number} 
	 */
	static toUnix( dateTime : Date ) : number | null
	{
		if( dateTime == undefined )
			return null;
		var date = new Date( dateTime );
		return date.getTime();
	}

	static toHHMMSS( secs : number ) : string
	{
		secs = Math.floor(secs);
		var sec_num = secs;
		var hours   = Math.floor( sec_num / 3600 );
		var minutes = Math.floor( sec_num / 60 ) % 60;
		var seconds = sec_num % 60;
    
		return [ hours,minutes,seconds ]
			.map( v => v < 10 ? "0" + v : v )
			.filter( ( v,i ) => v !== "00" || i > 0 )
			.join( ":" );
	}
}