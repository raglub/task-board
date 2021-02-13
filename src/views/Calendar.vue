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
      <calendar-event-modal :vueCalEvent="vueCalEvent" />
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CalendarEvent } from '../utils/calendarEvent'
import { VueCalEvent } from '@/utils/vueCalEvent'
import { VueCalCard } from '@/utils/vueCalCard'
import CalendarEventModal from '@/components/CalendarEventModal.vue'
import { DateTimeConverter } from '../utils/dateTimeConverter'
import Task from '@/models/task'
import 'vue-cal/dist/vuecal.css'
import { IpcInvoker } from '@/utils/ipc-invoker'
import { IpcChannel } from '@/utils/ipc-channel'
import { Duration } from '@/models/duration'
import VueCal from 'vue-cal'

@Component({
  components: {
    VueCal,
    CalendarEventModal
  }
})
export default class Calendar extends Vue {
  public tasks: Task[] = [];

  public events: CalendarEvent[] = [];

  public vueCalEvent: VueCalEvent;

  constructor () {
    super()
    this.vueCalEvent = new VueCalEvent()
  }

  async clickEvent (e: VueCalEvent) {
    this.vueCalEvent = e
    this.$bvModal.show('modal-calendar-event')
  }

  async updateEvents (response: VueCalCard) {
    const converter = new DateTimeConverter()
    const from = converter.toUnix(response.startDate)
    const to = converter.toUnix(response.endDate)
    const durations = await IpcInvoker.invoke(IpcChannel.FindDurationsFromTo, response.startDate, response.endDate)
    const events: CalendarEvent[] = []
    durations.forEach(async (duration: Duration) => {
      if (!!duration && !!duration.to && !!duration.taskId) {
        const task = await IpcInvoker.invoke(IpcChannel.FindOneTask, duration.taskId)
        const event = new CalendarEvent(task.name, duration.from, duration.to)
        events.push(event)
      }
    })
    this.events = events
  }
}
</script>

<style lang="scss">

</style>
