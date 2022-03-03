<template>
  <form class="space-form">
    <p class="mb-0">
      <input
        v-model="title"
        type="text"
        placeholder="card title"
        class="form-control form-control-lg space-form-title"
        style="font-size: 2rem"
      >
    </p>

    <div>
      <Draggable v-model="items" handle="i[data-cy=handle]">
        <SpaceFormItem
          v-for="item in items"
          :key="item.cid"
          :donor="item"
          :ref="item.cid"
          @remove="remove"
        />
      </Draggable>

      <a href="#" @click.prevent="add">
        ADD
      </a>
    </div>

    <div class="space-form-footer">
      <button
        class="btn btn-success"
        v-text="$tc('ui.save')"
        @click.prevent="submit"
      />

      <button
        class="btn btn-secondary"
        v-text="$tc('ui.cancel')"
        @click.prevent="$emit('cancel')"
      />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue"
import Draggable from "vuedraggable"
import {IWorkspace} from "~/store/WORKSPACE"
import SpaceFormItem from "~/components/SpaceForm/SpaceFormItem.vue"
import _reject from "lodash/reject"
import {CardItemEncodeOpts, ICardItem, ICardItemEnc, NewCardItem} from "~/store/CARD_ITEM"
import {CardEncodeOpts, CreateCardOpts, ICard, UpdateCardOpts} from "~/store/CARD"
import {MapUpsertCard} from "~/lib/domain_v1/card";

let cid: number = 0

export default Vue.extend({
  components: {SpaceFormItem, Draggable},
  props: {
    cardId: {
      type: String,
      required: false,
    },

    cardTitle: {
      type: String,
      required: false,
    },

    workspace: {
      type: Object as () => IWorkspace,
      required: true,
    },

    itemDonors: {
      type: Array as () => Array<ICardItem>,
      required: true,
    }
  },

  data(): ICard & { items: Array<ICardItem> } {
    return {
      id: this.cardId,
      archived: false,
      title: this.cardTitle,
      items: this.itemDonors,
      tags: [],
    }
  },

  methods: {
    async submit() {
      const items: Array<ICardItemEnc> = []
      for (const item of this.items) {
        const ref: any = this.$refs[item.cid]
        items.push(await this.$store.dispatch("CARD_ITEM/ENCODE", <CardItemEncodeOpts>{
          workspace: this.workspace, item: <ICardItem>ref[0].$data
        }))
      }

      const card = await this.$store.dispatch("CARD/ENCODE", <CardEncodeOpts>{
        workspace: this.workspace,
        item: <ICard>this.$data
      })

      if (this.cardId == null) {
        this.$emit("created", await this.$store.dispatch("CARD/CREATE", <CreateCardOpts>{
          workspace: this.workspace, req: MapUpsertCard(card, items)
        }))
      } else {
        this.$emit("created", await this.$store.dispatch("CARD/UPDATE", <UpdateCardOpts>{
          workspace: this.workspace, cardId: this.cardId, req: MapUpsertCard(card, items)
        }))
      }
    },

    remove(cid: number) {
      this.items = <Array<ICardItem>>_reject(this.items, {cid})
    },

    add() {
      this.items.push(NewCardItem(""))
    }
  }
})
</script>
