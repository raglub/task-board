<template>
  <b-input-group :title="datetime">
    <flat-pickr
      v-model="datetime"
      :config="config"
      class="form-control"
      @input="onDateChange"
      placeholder="Select date"
      name="date">
    </flat-pickr>
    <div class="input-group-append">
      <button class="btn btn-success" type="button" title="Choose a date-time" data-toggle="">
        <b-icon-calendar2-date/>
      </button>
    </div>
  </b-input-group>
</template>

<script lang="ts">
/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint @typescript-eslint/camelcase: "off" */
import { Component, Prop, Vue } from 'vue-property-decorator'
import Moment from 'moment'
import 'flatpickr/dist/flatpickr.css'
const flatPickr = require('vue-flatpickr-component')

@Component({
  components: {
    flatPickr
  }
})
export default class DateTime extends Vue {
  public datetime: string | null = '';

  public config = {
    wrap: true, // set wrap to true only when using 'input-group'
    altFormat: 'Y-m-d H:i:S',
    altInput: true,
    enableSeconds: true,
    enableTime: true,
    dateFormat: 'Y-m-d H:i:S',
    minuteIncrement: 1,
    secondIncrement: 1,
    time_24hr: true
  }

  @Prop()
  private value!: number;

  constructor () {
    super()
    this.datetime = Moment.unix(this.value / 1000).format('YYYY-MM-DD HH:mm:ss')
  }

  onDateChange (selectedDates: any, dateStr: string, instance: any) {
    let datetime = Moment(this.datetime).unix()
    datetime *= 1000
    this.$emit('input', datetime)
    this.$emit('afterUpdate')
  }
}
</script>

<style scoped lang="scss">

</style>
