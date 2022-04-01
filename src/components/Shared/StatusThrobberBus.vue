<template>
  <StatusThrobber ref="throbber" :fixed="true"/>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import StatusThrobber from "@/components/Shared/StatusThrobber.vue"

export const STATUS_THROBBER_SHOW = "STATUS_THROBBER_SHOW"
export const STATUS_THROBBER_ERROR = "STATUS_THROBBER_ERROR"
export const STATUS_THROBBER_HIDE = "STATUS_THROBBER_HIDE"
export const STATUS_THROBBER_FORCE_HIDE = "STATUS_THROBBER_FORCE_HIDE"

export default defineComponent({
  components: {StatusThrobber},

  mounted() {
    this.$bus.on(STATUS_THROBBER_SHOW, this.onShow)
    this.$bus.on(STATUS_THROBBER_ERROR, this.onError)
    this.$bus.on(STATUS_THROBBER_HIDE, this.onHide)
    this.$bus.on(STATUS_THROBBER_FORCE_HIDE, this.onForceHide)
  },

  beforeDestroy() {
    this.$bus.off(STATUS_THROBBER_SHOW, this.onShow)
    this.$bus.off(STATUS_THROBBER_ERROR, this.onError)
    this.$bus.off(STATUS_THROBBER_HIDE, this.onHide)
    this.$bus.off(STATUS_THROBBER_FORCE_HIDE, this.onForceHide)
  },

  methods: {
    onShow(args: { message: string, timeout?: number }) {
      const $el: any = this.$refs.throbber
      $el.show(args.message, args.timeout)
    },

    onError(args: { message: string, error: any }) {
      const $el: any = this.$refs.throbber
      $el.error(args.message, args.error)
    },

    onHide() {
      const $el: any = this.$refs.throbber
      $el.hide()
    },

    onForceHide() {
      const $el: any = this.$refs.throbber
      $el.forceHide()
    },
  }
})
</script>
