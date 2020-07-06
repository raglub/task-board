const Moment = require("moment");

export class CalendarEvent
{
    _name : string;
	_from : number;
    _to : number
    _start: string;
    _end: string;
	/**
	 * 
	 * @param {string} name 
	 * @param {number} from 
	 * @param {number} to 
	 */
	constructor(name : string, from : number, to : number)
	{
		this._name = name;
		this._from = from;
        this._to = to;
        this._start = Moment.unix(from/1000).format('YYYY-MM-DD HH:mm:ss');
        this._end = Moment.unix(to/1000).format('YYYY-MM-DD HH:mm:ss');;
	}

	/**
	 * @type {string}
	 */
	get name() {

		return this._name;
	}

    /**
	 * @type {string}
	 */
	get title() {
		return this._name;
    }
    
	/**
	 * @type {string}
	 */
	get from() {
		return this._from;
    }
    
    get content() {
		return '<i class="v-icon material-icons">golf_course</i>';
	}

    get class() {
		return 'bg-secondary text-light';
    }
 
	/**
	 * @type {string}
	 */
	get to() {
		return this._to;
    }
    
    get start() {
		return this._start;
	}

	/**
	 * @type {string}
	 */
	get end() {
		return this._end;
	}
}