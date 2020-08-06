export interface VueCalCard{
    view: string;
    startDate: Date; // View start - JS native Date object.
    endDate: Date; // View end - JS native Date object.
    firstCellDate: Date; // Month view only, in case cell is out of current month - JS native Date object.
    lastCellDate: Date; // Month view only, in case cell is out of current month - JS native Date object.
    outOfScopeEvents: any[]; // Month view only, all the events that are out of the current month.
    events: any[]; // All the events in the current view.
    week: number[]; // Week number. Only returned if view is 'week'.
}