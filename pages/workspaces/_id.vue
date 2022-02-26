<template>
  <div>
    <main
      :class="{'space-left-sown': leftShown, 'space-menu-shown': menuShown}"
      id="main"
      class="space"
    >
      <SpaceHeader
        :left.sync="leftShown"
        :menu.sync="menuShown"
      />

      <SpaceLeft
        :shown.sync="leftShown"
      />

      <SpaceRight/>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SpaceHeader from "~/components/Space/SpaceHeader.vue"
import SpaceLeft from "~/components/Space/SpaceLeft.vue"
import SpaceRight from "~/components/Space/SpaceRight.vue"
import {IWorkspace} from "~/store/WORKSPACE"
import {ICardLoadAllOpts} from "~/store/CARD"

export default Vue.extend({
  components: {SpaceRight, SpaceHeader, SpaceLeft},
  middleware: ['auth'],

  fetch(ctx) {
    const workspace = <IWorkspace>ctx.store.getters["WORKSPACE/ACTIVE"]
    ctx.store.dispatch("CARD/LOAD_ALL", <ICardLoadAllOpts>{workspaceID: workspace.id, aedKey: workspace.aedKey})
  },

  data() {
    return {
      leftShown: false,
      menuShown: false,
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
