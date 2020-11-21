<template>
  <b-form-group label="Tags:">
    <b-form-checkbox-group id="tags-group" v-model="tagIds" name="flavour-2">
      <b-form-checkbox v-for="tag in tags" :key="tag._id" @input="updateTags" :value="tag._id">{{ tag.name }}</b-form-checkbox>
    </b-form-checkbox-group>
  </b-form-group>  
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import Tag from '@/models/tag';
import { IpcInvoker } from '@/utils/ipc-invoker';
import { Guid16 } from '@/types/guid16';

@Component({
  components: {
  }
})
export default class TagList extends Vue {
  @Prop()
  private value!: Guid16[];

  private tagIds: Guid16[] = [];

  public tags: Tag[] = []

  mounted() {
    this.loadView()
  }

  async loadView() {
    this.tags = await IpcInvoker.getAllTags()
    this.tagIds.length = 0
    
    if (this.value) {
      this.tagIds.push(...this.value)
    }
  }

  updateTags(ctx: any) {
    this.$emit('input', this.tagIds)
  }
}
</script>

<style scoped lang="scss">

</style>
