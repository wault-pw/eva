<template>
  <main
      :class="{'space-left-sown': leftShown, 'space-menu-shown': menuShown, 'space-panel-shown': panel}"
      id="main"
      class="space-layout"
  >
    <transition name="space-backdrop-transition">
      <div
          v-if="leftShown || menuShown || edit"
          class="space-backdrop"
          @click.prevent="leftShown = menuShown = false"
      />
    </transition>

    <SpaceHeader
        v-model:query="query"
        :title="headerTitle"
        v-model:left="leftShown"
        v-model:menu="menuShown"
    />

    <SpaceLeft
        v-model:tag="activeTag"
        v-model:archived="archived"
        v-model:shown="leftShown"
        :readonly="readonly"
    />

    <SpaceRight
        v-model:active="activeCard"
        :cards="cards"
        @add="newCard"
    />

    <div :class="{'space-main-wrapper-force': showCard || edit, 'space-main-wrapper-focused': edit}" class="space-main-wrapper">
      <StatusThrobber :absolute="true" ref="throbber" class="space-main-throbber" />

      <SpaceForm
          v-if="edit"
          :donor="activeCard || blankCard()"
          :workspace="workspace"
          :item-donors="edit"
          :readonly="readonly"
          @cancel="cancelEdit"
          @created="onCreate"
          @loadingBegin="loadingBegin"
          @loadingDone="loadingDone"
      />

      <SpaceCard
          v-if="showCard"
          :key="activeCard.id"
          :card="activeCard"
          :workspace="workspace"
          :readonly="readonly"
          @edit="edit = $event"
          @cloned="activeCard = $event"
          @close="cancelEdit"
          @shot="shot"
          @loadingBegin="loadingBegin"
          @loadingDone="loadingDone"
      />
    </div>

    <SpaceMenu
        v-model:shown="menuShown"
        v-model:panel="panel"
    />

    <transition name="space-panel-transition">
      <SpacePanelExport v-if="panel === 'export'" @close="menuShown = false"/>
      <SpacePanelMfa v-else-if="panel === 'mfa'" :readonly="readonly" @close="menuShown = false"/>
      <SpacePanelPassphrase v-else-if="panel === 'passphrase'" :readonly="readonly" @close="menuShown = false"/>
      <SpacePanelTermination v-else-if="panel === 'termination'" :readonly="readonly" @close="menuShown = false"/>
    </transition>
  </main>
</template>

<script lang="ts">
import AuthMiddleware from "@/middlewares/AuthMiddleware"
import SpaceHeader from "@/components/Space/SpaceHeader.vue"
import {IWorkspace, WORKSPACE_STORE} from "@/store/WORKSPACE"
import {defineComponent} from "vue"
import {BlankCard, CARD_STORE, ICard} from "@/store/CARD"
import {USER_STORE} from "@/store/USER"
import SpaceLeft from "@/components/Space/SpaceLeft.vue"
import SpaceRight from "@/components/Space/SpaceRight.vue"
import {RouteLocationNormalized} from "vue-router"
import {ICardItem, NewCardItem} from "@/store/CARD_ITEM"
import StatusThrobber from "@/components/Shared/StatusThrobber.vue"
import SpaceCard from "@/components/Space/SpaceCard.vue"
import SpaceMenu from "@/components/Space/SpaceMenu.vue"
import _filter from "lodash/filter"
import _indexOf from "lodash/indexOf"
import SpaceForm from "@/components/SpaceForm/SpaceForm.vue"
import SpacePanelTermination from "@/components/SpacePanel/SpacePanelTermination.vue"
import SpacePanelMfa from "@/components/SpacePanel/SpacePanelMfa.vue"
import SpacePanelExport from "@/components/SpacePanel/SpacePanelExport.vue"
import SpacePanelPassphrase from "@/components/SpacePanel/SpacePanelPassphrase.vue"

export const PANEL_EXPORT = "export"
export const PANEL_PASSPHRASE = "passphrase"
export const PANEL_TERMINATION = "termination"
export const PANEL_MFA = "mfa"

interface IData {
  leftShown: boolean
  menuShown: boolean
  query: string
  edit: Array<ICardItem> | null
  archived: boolean
  panel: typeof PANEL_EXPORT | typeof PANEL_PASSPHRASE | typeof PANEL_TERMINATION | typeof PANEL_MFA | null
  activeCard: ICard | null
  activeTag: string | null
}

async function BeforeRoute(from: RouteLocationNormalized, to: RouteLocationNormalized) {
  WORKSPACE_STORE().SET_ACTIVE_ID(to.params.id as string)
  await CARD_STORE().LOAD_ALL(WORKSPACE_STORE().active)
}

function isTagged(card: ICard, tag: string | null): boolean {
  return _indexOf(card.tags, tag) >= 0
}

export default defineComponent({
  components: {
    SpaceForm, SpaceCard, StatusThrobber, SpaceRight, SpaceLeft, SpaceHeader, SpaceMenu,
    SpacePanelTermination, SpacePanelMfa, SpacePanelExport, SpacePanelPassphrase
  },

  async beforeRouteEnter(to, from, next) {
    if (!AuthMiddleware(next)) return

    await BeforeRoute(from, to)
    next()
  },

  async beforeUnmount() {
    await CARD_STORE().CLEAR()
    await WORKSPACE_STORE().CLEAR()
  },

  async beforeRouteUpdate(to, from) {
    await BeforeRoute(from, to)
    this.activeCard = null
    this.activeTag = null
    this.edit = null
    this.archived = false
    this.query = ""
    this.leftShown = false
    this.menuShown = false
    return true
  },

  data(): IData {
    return {
      leftShown: false,
      menuShown: false,
      query: "",
      edit: null,
      archived: false,
      activeCard: null,
      panel: null,
      activeTag: null
    }
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
    workspace(): IWorkspace {
      return WORKSPACE_STORE().active
    },

    cards(): Array<ICard> {
      const cards = CARD_STORE().list
      let filtered: Array<ICard> = []

      if (this.archived) {
        filtered = _filter(cards, {archived: true})
      } else if (this.activeTag == null) {
        filtered = _filter(cards, {archived: false})
      } else {
        filtered = _filter(cards, (card) => !card.archived && isTagged(card, this.activeTag))
      }

      if (this.query !== "") {
        const query = this.query.toLowerCase()
        filtered = _filter(filtered, (card) => {
          return card.title.toLowerCase().search(query) >= 0
        })
      }

      return filtered
    },

    readonly(): boolean {
      return USER_STORE().readonly
    },

    headerTitle(): string | null {
      return this.archived ? this.$tc("card.archived") : this.activeTag
    },

    showCard(): boolean {
      return !this.edit && this.activeCard !== null
    }
  },

  methods: {
    cancelEdit() {
      this.edit = null
      this.activeCard = null
    },

    newCard() {
      // to hide throbber if user clicked on card,
      // did not wait until loading done, and clicked on add button
      this.loadingDone()
      this.activeCard = null
      this.edit = [
        NewCardItem(this.$tc("user.username")),
        NewCardItem(this.$tc("user.password")),
        NewCardItem(this.$tc("ui.notes"), "\n\n"),
      ]
    },

    loadingBegin() {
      const throbber: any = this.$refs.throbber
      // timeout to disable throbber blinking on card load
      throbber.show(this.$tc("ui.loading"), 500)
    },

    loadingDone() {
      const throbber: any = this.$refs.throbber
      throbber.forceHide()
    },

    shot(text: string) {
      const throbber: any = this.$refs.throbber
      throbber.shot(text)
    },

    blankCard(): ICard {
      return BlankCard()
    },

    onCreate(card: ICard) {
      this.edit = null
      this.activeCard = card
    },
  }
})
</script>
