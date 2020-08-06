<template>
    <b-container class="calendar mb-4">
      <h2>Calendar</h2>
      <vue-cal
         :time-from="6 * 60"
         :time-to="24 * 60"
         :disable-views="['years', 'year', 'month']"
         @view-change="updateEvents"
         @ready="updateEvents"
         :resizeX="true"
         :on-event-click="clickEvent"
         :events="events">
      </vue-cal>
      <calendar-event-modal :vueCalEvent=vueCalEvent />
    </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { CalendarEvent } from '../utils/calendarEvent';
import { VueCalEvent } from '@/utils/vueCalEvent';
import { VueCalCard } from '@/utils/vueCalCard';
import CalendarEventModal from '@/components/CalendarEventModal.vue'
import { DateTimeConverter } from '../utils/dateTimeConverter';
const Moment = require("moment");
import { Task } from "@/utils/task";
import { RemoteTasksStore } from '@/db/stores/remoteTasksStore'
const VueCal = require('vue-cal');
import 'vue-cal/dist/vuecal.css'

@Component({
  components: {
    VueCal,
    CalendarEventModal
  }
})
export default class Calendar extends Vue {
  public tasks: Task[] = [];

  private tasksStore: RemoteTasksStore;

  public events: CalendarEvent[] = [];
  
  public vueCalEvent: VueCalEvent;

  constructor() {
    super();
    this.tasksStore = new RemoteTasksStore();
    this.vueCalEvent = new VueCalEvent();
  }

  async clickEvent(e: VueCalEvent)
  {
    this.vueCalEvent = e
    this.$bvModal.show('modal-calendar-event')
  }
  async updateEvents(response: VueCalCard )
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