const Moment = require('moment')

export class CalendarEvent {
    name: string;
	  from: number;
    to: number
    _start: string;
    _end: string;

    title: string;
    /**
	 *
	 * @param {string} name
	 * @param {number} from
	 * @param {number} to
	 */
    constructor (name: string, from: number, to: number) {
      this.title = name
      this.name = name
      this.from = from
      this.to = to
      this._start = Moment.unix(from / 1000).format('YYYY-MM-DD HH:mm:ss')
      this._end = Moment.unix(to / 1000).format('YYYY-MM-DD HH:mm:ss')
    }

    get content () {
      return '<i class="v-icon material-icons">golf_course</i>'
    }

    get class () {
      return 'bg-secondary text-light'
    }

    get start () {
      return this._start
    }

    /**
	 * @type {string}
	 */
    get end () {
      return this._end
    }
}
