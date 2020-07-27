<template>
    <b-container class="calendar">
      <h2>Calendar</h2>
      <vue-cal
         :time-from="6 * 60"
         :time-to="24 * 60"
         :disable-views="['years', 'year', 'month']"
         @view-change="updateEvents"
         @ready="updateEvents"
         :events="events">
      </vue-cal>
    </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { CalendarEvent } from '../utils/calendarEvent';
import { CalendarResponse } from '../utils/calendarResponse';
import { DateTimeConverter } from '../utils/dateTimeConverter';
const Moment = require("moment");
import { Task } from "@/utils/task";
import { RemoteTasksStore } from '@/db/stores/remoteTasksStore'
const VueCal = require('vue-cal');
import 'vue-cal/dist/vuecal.css'

@Component({
  components: {
    VueCal
  }
})
export default class Calendar extends Vue {
  public tasks: Task[] = [];

  private tasksStore: RemoteTasksStore;

  public events: CalendarEvent[] = [];
  
  constructor() {
    super();
    this.tasksStore = new RemoteTasksStore();
  }

  async updateEvents(response: CalendarResponse)
  {
    var converter = new DateTimeConverter();
    var from = converter.toUnix(response.startDate);
    var to = converter.toUnix(response.endDate);
    var tasksByDay = await this.tasksStore.findFromTo(response.startDate, response.endDate);
    var events : CalendarEvent[] = [];
    tasksByDay.forEach(function(task : any)
    {
        task.durations.forEach(function(duration : any)
        {   
            if(from != null && to != null && duration.from >= from && duration.to < to)
            {
                var event = new CalendarEvent(task.name, duration.from, duration.to);
                events.push(event);
            }
        });
    });
    this.events = events;
  }
}
</script>

<style lang="scss">

</style>