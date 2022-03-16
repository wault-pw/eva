<template>
  <div>
    <StatusThrobberBus/>
    <DialogBus/>

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
        :title="headerTitle"
        :left.sync="leftShown"
        :menu.sync="menuShown"
      />

      <SpaceLeft
        :tag.sync="activeTag"
        :archived.sync="archived"
        :shown.sync="leftShown"
        :readonly="readonly"
      />

      <SpaceRight
        :active.sync="activeCard"
        :cards="cards"
        @add="newCard"
      />

      <SpaceForm
        v-if="edit"
        :donor="activeCard || blankCard()"
        :workspace="workspace"
        :item-donors="edit"
        :readonly="readonly"
        @cancel="cancelEdit"
        @created="onCreate"
      />

      <SpaceCard
        v-if="!edit && activeCard"
        :key="activeCard.id"
        :card="activeCard"
        :workspace="workspace"
        :readonly="readonly"
        @edit="edit = $event"
        @cloned="activeCard = $event"
        @close="cancelEdit"
      />

      <SpaceMenu
        :shown.sync="menuShown"
        :panel.sync="panel"
      />

      <transition name="space-panel-transition">
        <SpacePanelExport v-if="panel === 'export'" @close="menuShown = false"/>
        <SpacePanelPassphrase v-if="panel === 'passphrase'" @close="menuShown = false"/>
        <SpacePanelTermination v-if="panel === 'termination' " @close="menuShown = false"/>
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SpaceHeader from "~/components/Space/SpaceHeader.vue"
import SpaceLeft from "~/components/Space/SpaceLeft.vue"
import SpaceRight from "~/components/Space/SpaceRight.vue"
import DialogBus from "~/components/Shared/DialogBus.vue"
import SpaceForm from "~/components/SpaceForm/SpaceForm.vue"
import SpaceCard from "~/components/Space/SpaceCard.vue"
import SpaceMenu from "~/components/Space/SpaceMenu.vue"
import StatusThrobberBus from "~/components/Shared/StatusThrobberBus.vue"
import SpacePanelExport from "~/components/SpacePanel/SpacePanelExport.vue"
import SpacePanelPassphrase from "~/components/SpacePanel/SpacePanelPassphrase.vue";
import SpacePanelTermination from "~/components/SpacePanel/SpacePanelTermination.vue";
import {IWorkspace} from "~/store/WORKSPACE"
import {ICard, CardLoadAllOpts, BlankCard} from "~/store/CARD"
import _filter from "lodash/filter"
import _indexOf from "lodash/indexOf"
import {ICardItem, NewCardItem} from "~/store/CARD_ITEM";

export const PANEL_EXPORT = "export"
export const PANEL_PASSPHRASE = "passphrase"
export const PANEL_TERMINATION = "termination"

interface IData {
  leftShown: boolean
  menuShown: boolean
  edit: Array<ICardItem> | null
  archived: boolean
  panel: typeof PANEL_EXPORT | typeof PANEL_PASSPHRASE | typeof PANEL_TERMINATION | null
  activeCard: ICard | null
  activeTag: string | null
}

function isTagged(card: ICard, tag: string | null): boolean {
  return _indexOf(card.tags, tag) >= 0
}

export default Vue.extend({
  middleware: ['auth'],
  key: "WORKSPACE_ID",

  components: {
    SpacePanelTermination,
    SpacePanelPassphrase,
    SpacePanelExport,
    StatusThrobberBus, SpaceMenu, SpaceCard, SpaceForm, DialogBus, SpaceRight, SpaceHeader, SpaceLeft
  },

  fetch(ctx) {
    ctx.store.commit("WORKSPACE/SET_ACTIVE_ID", <string>ctx.params.id)
    const workspace = ctx.store.state.WORKSPACE.active
    ctx.store.dispatch("CARD/LOAD_ALL", <CardLoadAllOpts>{workspace: workspace})
  },

  data(): IData {
    return {
      leftShown: false,
      menuShown: false,
      edit: null,
      archived: false,
      activeCard: null,
      panel: null,
      activeTag: null
    }
  },

  beforeDestroy() {
    this.$store.commit("WORKSPACE/CLEAR")
    this.$store.commit("CARD/CLEAR")
  },

  watch: {
    activeTag() {
      this.leftShown = false
    },

    archived() {
      this.leftShown = false
    },

    menuShown() {
      this.panel = null
    }
  },

  computed: {
    readonly(): boolean {
      return this.$store.state.USER.readonly
    },

    workspace(): IWorkspace {
      return this.$store.state.WORKSPACE.active
    },

    headerTitle(): string | null {
      return this.archived ? this.$tc("card.archived") : this.activeTag
    },

    cards(): Array<ICard> {
      const cards = this.$store.state.CARD.list

      if (this.archived) {
        return _filter(cards, {archived: true})
      } else if (this.activeTag == null) {
        return _filter(cards, {archived: false})
      } else {
        return _filter(cards, (card) => !card.archived && isTagged(card, this.activeTag))
      }
    }
  },

  methods: {
    newCard() {
      this.activeCard = null
      this.edit = [
        NewCardItem(this.$i18n.tc("ui.username")),
        NewCardItem(this.$i18n.tc("ui.passphrase")),
        NewCardItem(this.$i18n.tc("ui.notes"), "\n\n"),
      ]
    },

    cancelEdit() {
      this.edit = null
      this.activeCard = null
    },

    onCreate(card: ICard) {
      this.edit = null
      this.activeCard = card
    },

    blankCard(): ICard {
      return BlankCard()
    }
  },

  head() {
    return {
      title: (<any>this).workspace.title,
      titleTemplate: this.$tc("space.titleTemplate")
    }
  }
})
</script>
