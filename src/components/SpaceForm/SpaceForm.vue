<template>
  <form name="card" class="space-form">
    <p class="mb-0">
      <input
          v-model="title"
          :placeholder="$tc('spaceForm.title').toLowerCase()"
          data-cy="title"
          type="text"
          class="form-control form-control-lg space-form-title h1"
      >
    </p>

    <div class="space-form-item">
      <div class="space-form-item-row">
        <i/>

        <InputTag
            :placeholder="$tc('ui.tag').toLowerCase()"
            v-model:tags="tags"
        />

        <i/>
      </div>
    </div>

    <Draggable v-model="items" item-key="cid" handle=".cursor-move">
      <template #item="{element}">
        <SpaceFormItem
            :key="element.cid"
            :donor="element"
            :ref="element.cid"
            @remove="remove"
        />
      </template>
    </Draggable>

    <SpaceFormAdd @add="add"/>

    <div class="space-form-footer mt-auto">
      <button
          :disabled="readonly"
          data-cy="save"
          class="btn btn-lg btn-success"
          v-text="$tc('ui.save')"
          @click.prevent="trySubmit"
      />

      <button
          class="btn btn-lg btn-gray"
          v-text="$tc('ui.cancel')"
          @click.prevent="$emit('cancel')"
      />
    </div>
  </form>
</template>

<script lang="ts">
import {CARD_STORE, ICard, ICardEnc} from "@/store/CARD"
import {CARD_ITEM_STORE, ICardItem, ICardItemEnc, NewCardItem} from "@/store/CARD_ITEM"
import {IWorkspace} from "@/store/WORKSPACE"
import {defineComponent} from "vue"
import Draggable from "vuedraggable"
import InputTag from "@/components/Form/InputTag.vue"
import SpaceFormAdd from "@/components/SpaceForm/SpaceFormAdd.vue"
import SpaceFormItem from "@/components/SpaceForm/SpaceFormItem.vue"
import _reject from "lodash/reject"
import {MapUpsertCard} from "@/mapper_v1/card.mapper"

export default defineComponent({
  components: {Draggable, SpaceFormItem, SpaceFormAdd, InputTag},
  props: {
    donor: {
      type: Object as () => ICard,
      required: true,
    },

    workspace: {
      type: Object as () => IWorkspace,
      required: true,
    },

    itemDonors: {
      type: Array as () => Array<ICardItem>,
      required: true,
    },

    readonly: {
      type: Boolean,
      required: true
    }
  },

  data(): ICard & { items: Array<ICardItem> } {
    return {
      id: this.donor.id,
      archived: this.donor.archived,
      title: this.donor.title,
      items: this.itemDonors,
      tags: this.donor.tags,
    }
  },

  methods: {
    add() {
      this.items.push(NewCardItem(""))
    },

    remove(cid: number) {
      this.items = <Array<ICardItem>>_reject(this.items, {cid})
    },

    async trySubmit() {
      this.$emit('loadingBegin')
      const card = await this.submit()
      this.$emit('loadingDone')
      this.$emit("created", card)
    },

    async submit(): Promise<ICard> {
      const items: Array<ICardItemEnc> = []

      for (const item of this.items) {
        const ref: any = this.$refs[item.cid]
        items.push(await CARD_ITEM_STORE().ENCODE(this.workspace, <ICardItem>ref.$data))
      }

      const card: ICardEnc = await CARD_STORE().ENCODE(this.workspace, <ICard>this.$data)

      if (this.id == "") {
        return await CARD_STORE().CREATE(this.workspace, MapUpsertCard(card, items))
      } else {
        return await CARD_STORE().UPDATE(this.workspace, card.id, MapUpsertCard(card, items))
      }
    },

  }
})
</script>
