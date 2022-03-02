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
      <Draggable v-model="items">
        <SpaceFormItem
          v-for="item in items"
          :key="item.cid"
          :donor="item"
          ref="items"
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
import {CardItemEncodeOpts, ICardItem, ICardItemEnc} from "~/store/CARD_ITEM"
import {UUID} from "~/lib/cryptos/util"
import {CardEncodeOpts, CreateCardOpts, ICard} from "~/store/CARD"
import {MapCreateCard} from "~/lib/domain_v1/card";

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
      const refs = this.$refs.items as Array<any> ?? []
      const items: Array<ICardItemEnc> = []

      for (const ref of refs) {
        items.push(await this.$store.dispatch("CARD_ITEM/ENCODE", <CardItemEncodeOpts>{
          workspace: this.workspace, item: <ICardItem>ref.$data
        }))
      }

      const card = await this.$store.dispatch("CARD/ENCODE", <CardEncodeOpts>{
        workspace: this.workspace,
        item: <ICard>this.$data
      })

      const out = await this.$store.dispatch("CARD/CREATE", <CreateCardOpts>{
        workspace: this.workspace,
        req: MapCreateCard(card, items),
      })

      this.$emit("created", out)
    },

    remove(cid: number) {
      this.items = <Array<ICardItem>>_reject(this.items, {cid})
    },

    add() {
      this.items.push({
        id: "",
        cid: UUID(),
        title: "",
        body: "",
        hidden: false
      })
    }
  }
})
</script>
