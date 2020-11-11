<template>
  <b-modal id="modal-new-tag"
    title="New Tag"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <div role="group">
    <label for="input-live">Name:</label>
    <b-form-input
      id="input-live"
      v-model="name"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Enter your name"
      trim
    ></b-form-input>

    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">
      Enter at least 3 letters
    </b-form-invalid-feedback>

    <!-- This is a form text block (formerly known as help block) -->
    <b-form-text id="input-live-help">Your full name.</b-form-text>
  </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Task from "@/models/task";
import { ActionTypes } from '@/store/action-types';
import Tag from '@/models/tag';
import { Actions } from '@/store/actions';
import { IpcInvoker } from '@/utils/ipc-invoker'

@Component
export default class NewTask extends Vue {
  public name: string = '';

  constructor() {
    super();
  }

  public async handleOk(bvModalEvt: any) {
    const tag = new Tag()
    tag.name = this.name
    const newTag = await IpcInvoker.createTag(tag.name)
  }

  public resetModal() {
    this.name = ''
  }

}
</script>

<style scoped lang="scss">

</style>
