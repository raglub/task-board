export class VueCalEvent {
    allDay: boolean;
    background: boolean;
    class: string;
    content: string;
    daysCount: number;
    end: Date;
    endTimeMinutes: number
    from: number;
    name: string;
    start: Date;
    title: string;
    to: number

    constructor() {
        this.allDay= false;
        this.background = false;
        this.class = '';
        this.content = '';
        this.daysCount = 0;
        this.end = new Date();
        this.endTimeMinutes = 0;
        this.from = 0;
        this.name = '';
        this.start = new Date();
        this.title = '';
        this.to = 0
    }
}
