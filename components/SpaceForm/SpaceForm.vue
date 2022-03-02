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
import {ICardItem} from "~/store/CARD_ITEM"
import {UUID} from "~/lib/cryptos/util";

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

  data() {
    return {
      id: this.cardId,
      title: this.cardTitle,
      items: this.itemDonors,
    }
  },

  methods: {
    submit() {
      const refs = this.$refs.items as Array<any> ?? []
      refs.forEach((ref: any) => {
        console.log(ref.title)
      })
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
