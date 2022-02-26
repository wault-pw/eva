<template>
  <div>
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
      />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SpaceHeader from "~/components/Space/SpaceHeader.vue"
import SpaceLeft from "~/components/Space/SpaceLeft.vue"
import SpaceRight from "~/components/Space/SpaceRight.vue"
import {IWorkspace} from "~/store/WORKSPACE"
import {ICard, ICardLoadAllOpts} from "~/store/CARD"

export default Vue.extend({
  components: {SpaceRight, SpaceHeader, SpaceLeft},
  middleware: ['auth'],

  fetch(ctx) {
    const workspace = <IWorkspace>ctx.store.getters["WORKSPACE/ACTIVE"]
    ctx.store.dispatch("CARD/LOAD_ALL", <ICardLoadAllOpts>{workspaceID: workspace.id, aedKey: workspace.aedKey})
  },

  data(): { leftShown: boolean, menuShown: boolean, edit: boolean, activeCard: ICard | null } {
    return {
      leftShown: false,
      menuShown: false,
      edit: false,
      activeCard: null
    }
  },

  computed: {
    workspace(): IWorkspace {
      return this.$store.getters["WORKSPACE/ACTIVE"]
    },
  },

  head() {
    return {
      title: (<any>this).workspace.title,
    }
  }
})
</script>
