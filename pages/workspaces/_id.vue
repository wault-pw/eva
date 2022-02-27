<template>
  <div>
    <DialogBus />

    <main
      :class="{'space-left-sown': leftShown, 'space-menu-shown': menuShown}"
      id="main"
      class="space"
    >
      <transition name="space-backdrop-transition">
        <div
          v-if="leftShown || menuShown || edit"
          class="space-backdrop"
          @click.prevent="leftShown = menuShown = false"
        />
      </transition>

      <SpaceHeader
        :title="activeTag && activeTag.name"
        :left.sync="leftShown"
        :menu.sync="menuShown"
      />

      <SpaceLeft
        :active-tag.sync="activeTag"
        :shown.sync="leftShown"
      />

      <SpaceRight
        :active.sync="activeCard"
        :cards="cards"
        @add="newCard"
      />

      <SpaceForm
        v-if="edit"
        :card-id="activeCard && activeCard.id"
        :card-title="activeCard && activeCard.title"
        :workspace="workspace"
        class="space-main space-main-focused"
        @cancel="cancelEdit"
        @created=""
      />

      <SpaceCard
        v-if="!edit && activeCard"
        :key="activeCard.id"
        :card="activeCard"
        :workspace="workspace"
        @edit="edit = true"
        @cloned="activeCard = $event"
        @destroyed="cancelEdit"
      />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SpaceHeader from "~/components/Space/SpaceHeader.vue"
import SpaceLeft from "~/components/Space/SpaceLeft.vue"
import SpaceRight from "~/components/Space/SpaceRight.vue"
import DialogBus from "~/components/Shared/DialogBus.vue"
import SpaceForm from "~/components/Space/SpaceForm.vue"
import SpaceCard from "~/components/Space/SpaceCard.vue"
import {IWorkspace} from "~/store/WORKSPACE"
import {ICard, ICardLoadAllOpts, ITag} from "~/store/CARD"
import _filter from "lodash/filter"
import _indexOf from "lodash/indexOf"

interface IData {
  leftShown: boolean
  menuShown: boolean
  edit: boolean
  activeCard: ICard | null
  activeTag: ITag | null
}

export default Vue.extend({
  components: {SpaceCard, SpaceForm, DialogBus, SpaceRight, SpaceHeader, SpaceLeft},
  middleware: ['auth'],

  fetch(ctx) {
    ctx.store.commit("WORKSPACE/SET_ACTIVE_ID", <string>ctx.params.id)
    const workspace = ctx.store.state.WORKSPACE.active
    ctx.store.dispatch("CARD/LOAD_ALL", <ICardLoadAllOpts>{workspaceID: workspace.id, aedKey: workspace.aedKey})
  },

  data(): IData {
    return {
      leftShown: false,
      menuShown: false,
      edit: false,
      activeCard: null,
      activeTag: null
    }
  },

  computed: {
    workspace(): IWorkspace {
      return this.$store.state.WORKSPACE.active
    },

    cards(): Array<ICard> {
      const cards = this.$store.state.CARD.list

      if (this.activeTag == null) return cards

      return _filter(cards, (card) => {
        return _indexOf(card.tags, this.activeTag?.name) >= 0
      })
    }
  },

  methods: {
    newCard() {
      this.activeCard = null
      this.edit = true
    },

    cancelEdit() {
      this.edit = false
      this.activeCard = null
    }
  },

  head() {
    return {
      title: (<any>this).workspace.title,
    }
  }
})
</script>
