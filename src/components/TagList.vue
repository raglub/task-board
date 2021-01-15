<template>
  <b-form-group label="Tags:">
    <b-form-checkbox-group id="tags-group" v-model="tagIds" name="flavour-2">
      <b-form-checkbox v-for="tag in tags" @input="updateTags" :key="tag._id" :value="tag._id">{{ tag.name }}</b-form-checkbox>
    </b-form-checkbox-group>
  </b-form-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, Watch } from 'vue-property-decorator';
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

  @Watch('value')
  onChangeValue(newTagIds: Guid16[], oldTagIds: Guid16[]){
    if (newTagIds) {
      const tagIds = newTagIds.filter((v, i, a) => a.indexOf(v) === i);
      if (this.tagIds.length !== newTagIds.length) {
        this.tagIds.length = 0
        this.tagIds.push(...newTagIds)
      } else {
        for(let i = 0; i < this.tagIds.length; i++) {
          if (this.tagIds[i] !== newTagIds[i]) {
            this.tagIds.length = 0
            this.tagIds.push(...newTagIds)
            break
          } 
        }
      }
    }
  }

  mounted() {
    this.loadView()
  }

  async loadView() {
    this.tags = await IpcInvoker.getAllTags()
  }

  updateTags(ctx: any) {
    this.$emit('input', this.tagIds)
  }
}
</script>

<style scoped lang="scss">

</style>
