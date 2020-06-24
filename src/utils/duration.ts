import { DateTimeConverter} from "./dateTimeConverter";

export class Duration
{
	public from : number;

	public to : number | null;

    constructor()
	{
		this.from = -1;
		this.to = null;
	}
	
	public fromToString() : string
	{
		return new DateTimeConverter().toString(this.from)
	}

	public toToString() : string
	{
		if(this.to == null)
			return new DateTimeConverter().toString(0);
		return new DateTimeConverter().toString(this.to)
	}
	
}