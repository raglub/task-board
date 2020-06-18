import { DateTimeConverter} from "./dateTimeConverter";

export class Duration
{
	public from : number;

	public to : number;

    constructor()
	{
		this.from = -1;
		this.to = -1;
	}
	
	public fromToString() : string
	{
		return new DateTimeConverter().toString(this.from)
	}

	public toToString() : string
	{
		return new DateTimeConverter().toString(this.to)
	}
	
}