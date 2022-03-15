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
      <div class="space-form-item">
        <div class="space-form-item-row">
          <i/>
          <InputTag
            :placeholder="$tc('ui.tag').toLowerCase()"
            :options="allTags"
            :tags.sync="tags"
          />
          <i/>
        </div>
      </div>

      <Draggable v-model="items" handle=".x-move">
        <SpaceFormItem
          v-for="item in items"
          :key="item.cid"
          :donor="item"
          :ref="item.cid"
          @remove="remove"
        />
      </Draggable>

      <SpaceFormAdd
        @add="add"
      />
    </div>

    <div class="space-form-footer">
      <button
        :disabled="readonly"
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
import {CardEncodeOpts, CreateCardOpts, ICard, ICardEnc, TagSet, UpdateCardOpts} from "~/store/CARD"
import {MapUpsertCard} from "~/lib/domain_v1/card";
import InputTag from "~/components/Form/InputTag.vue";
import SpaceFormAdd from "~/components/SpaceForm/SpaceFormAdd.vue";

let cid: number = 0

export default Vue.extend({
  components: {SpaceFormAdd, InputTag, SpaceFormItem, Draggable},
  props: {
    donor: {
      type: Object as() => ICard,
      required: true,
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
      id: this.donor.id,
      archived: this.donor.archived,
      title: this.donor.title,
      items: this.itemDonors,
      tags: this.donor.tags,
    }
  },

  computed: {
    readonly(): boolean {
      return this.$store.state.USER.readonly
    },

    allTags(): Array<string> {
      const set: TagSet = this.$store.getters["CARD/TAG_SET"]
      return set.list()
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

      const card: ICardEnc = await this.$store.dispatch("CARD/ENCODE", <CardEncodeOpts>{
        workspace: this.workspace,
        item: <ICard>this.$data
      })

      if (this.id == "") {
        this.$emit("created", await this.$store.dispatch("CARD/CREATE", <CreateCardOpts>{
          workspace: this.workspace, req: MapUpsertCard(card, items)
        }))
      } else {
        this.$emit("created", await this.$store.dispatch("CARD/UPDATE", <UpdateCardOpts>{
          workspace: this.workspace, cardId: this.id, req: MapUpsertCard(card, items)
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
