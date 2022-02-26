<template>
  <h1>
    {{ list }}
  </h1>
</template>

<script lang="ts">
import Vue from 'vue'
import {IWorkspace} from "~/store/WORKSPACE"

export default Vue.extend({
  middleware: ['auth'],

  async fetch(ctx) {
    await ctx.store.dispatch('WORKSPACE/LOAD_ALL', ctx.store.state.USER)
    // TODO: if workspace is empty render new workspace form
    const workspace = ctx.store.getters["WORKSPACE/DEFAULT"]
    await ctx.redirect(ctx.$urn.workspace(workspace.id))
  },

  computed: {
    list(): Array<IWorkspace> {
      return this.$store.state.WORKSPACE.list
    }
  }
})
</script>
