<template>
  <Dialog ref="dialog"/>
</template>

<script lang="ts">
import Vue from 'vue'
import Dialog, {DialogShowOpts} from "~/components/Shared/Dialog.vue"

export const DIALOG_SHOW = "DIALOG_SHOW"

export default Vue.extend({
  components: {Dialog},

  mounted() {
    this.$bus.$on(DIALOG_SHOW, this.onShow)
  },

  beforeDestroy() {
    this.$bus.$off(DIALOG_SHOW, this.onShow)
  },

  methods: {
    onShow(opts: DialogShowOpts) {
      (<any>this.$refs.dialog).show(opts)
    },
  }
})
</script>
