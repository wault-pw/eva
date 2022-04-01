<template>
  <Dialog ref="dialog"/>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import Dialog, {DialogShowOpts} from "@/components/Shared/Dialog.vue"

export const DIALOG_SHOW = "DIALOG_SHOW"

export default defineComponent({
  components: {Dialog},

  mounted() {
    this.$bus.on(DIALOG_SHOW, this.onShow)
  },

  beforeDestroy() {
    this.$bus.off(DIALOG_SHOW, this.onShow)
  },

  methods: {
    onShow(opts: DialogShowOpts) {
      (<any>this.$refs.dialog).show(opts)
    },
  }
})
</script>
