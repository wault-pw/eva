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
        :left.sync="leftShown"
        :menu.sync="menuShown"
      />

      <SpaceLeft
        :shown.sync="leftShown"
      />

      <SpaceRight
        :active.sync="activeCard"
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
        v-if="activeCard"
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
import {IWorkspace} from "~/store/WORKSPACE"
import {ICard, ICardLoadAllOpts} from "~/store/CARD"
import SpaceCard from "~/components/Space/SpaceCard.vue";

interface IData {
  leftShown: boolean
  menuShown: boolean
  edit: boolean
  activeCard: ICard | null
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
      activeCard: null
    }
  },

  computed: {
    workspace(): IWorkspace {
      return this.$store.state.WORKSPACE.active
    },
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
