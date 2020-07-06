export class CalendarResponse{
    public view: string;
    public startDate: Date; // View start - JS native Date object.
    public endDate: Date; // View end - JS native Date object.
    public firstCellDate: Date; // Month view only, in case cell is out of current month - JS native Date object.
    public lastCellDate: Date; // Month view only, in case cell is out of current month - JS native Date object.
    public outOfScopeEvents: any[]; // Month view only, all the events that are out of the current month.
    public events: any[]; // All the events in the current view.
    public week: number[]; // Week number. Only returned if view is 'week'.

    constructor()
    {
        this.view = "";
        this.startDate = new Date();
        this.endDate = new Date();
        this.firstCellDate = new Date();
        this.lastCellDate = new Date();
        this.outOfScopeEvents = [];
        this.events = [];
        this.week = [];
    }
}