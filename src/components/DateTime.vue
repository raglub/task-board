<template>
 <b-input-group>
    <b-input-group-append>
    <div style="width: 155px;" class="pr-0">
      <b-input-group>
        <b-form-input
          id="date-input"
          v-model="date"
          type="text"
          placeholder="YYYY-MM-DD"
          autocomplete="off"
        ></b-form-input>
        <b-input-group-append>
          <b-form-datepicker
            v-model="date"
            button-only
            right
            locale="en-US"
            aria-controls="date-input"
            @context="onContext"
          ></b-form-datepicker>
        </b-input-group-append>
      </b-input-group>
    </div>
    
    <div style="width: 140px;" class="pl-1">
      <b-input-group>
        <b-form-input
          id="time-input"
          v-model="time"
          type="text"      
          placeholder="HH:mm:ss"
        ></b-form-input>
        <b-input-group-append>
          <b-form-timepicker
            v-model="time"
            button-only
            right
            show-seconds
            @context="onContext"
            locale="en"
            aria-controls="time-input"
          ></b-form-timepicker>
        </b-input-group-append>
      </b-input-group>
    </div>
    </b-input-group-append>
  </b-input-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DateTimeConverter } from '../utils/dateTimeConverter'
const Moment = require("moment");

@Component
export default class DateTime extends Vue {
  public date: string = '';

  public time: string = '';

  @Prop()
  private datetime!: number;

  constructor() {
    super();
    //if( epochDateTime == undefined )
		//	return "";
		this.time = Moment.unix(this.datetime/1000).format('HH:mm:ss');
    this.date = Moment.unix(this.datetime/1000).format('YYYY-MM-DD');
  }

  onContext(ctx: any) {
    var datetime = new Moment(this.date + " " + this.time).unix();
    datetime *= 1000;
    this.$emit('update:datetime', datetime)
  }
}
</script>

<style scoped lang="scss">

</style>
