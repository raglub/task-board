<template>
  <b-modal id="modal-calendar-event"
    hide-footer
    :title="vueCalEvent.name"
  >
    <p>
      <strong>Start: </strong> {{ vueCalEvent._start }}
    </p>
    <p>
      <strong>Stop: </strong> {{ vueCalEvent._end }}
    </p>
    <hr/>
    <b-button class="float-right alight-right" variant="primary" @click="$bvModal.hide('modal-calendar-event')">OK</b-button>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VueCalEvent } from '@/utils/vueCalEvent'

@Component
export default class CalendarEventModal extends Vue {
  public name = '';

  @Prop()
  private vueCalEvent!: VueCalEvent | undefined;

  public clickOk () {
    throw new Error('To be implemented')
  }
}
</script>

<style scoped lang="scss">

</style>
