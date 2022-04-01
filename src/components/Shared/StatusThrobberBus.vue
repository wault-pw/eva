<template>
  <StatusThrobber ref="throbber" :fixed="true"/>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import StatusThrobber from "@/components/Shared/StatusThrobber.vue"

export const STATUS_THROBBER_SHOW = "STATUS_THROBBER_SHOW"
export const STATUS_THROBBER_ERROR = "STATUS_THROBBER_ERROR"
export const STATUS_THROBBER_HIDE = "STATUS_THROBBER_HIDE"

export default defineComponent({
  components: {StatusThrobber},

  mounted() {
    this.$bus.on(STATUS_THROBBER_SHOW, this.onShow)
    this.$bus.on(STATUS_THROBBER_ERROR, this.onError)
    this.$bus.on(STATUS_THROBBER_HIDE, this.onHide)
  },

  beforeDestroy() {
    this.$bus.off(STATUS_THROBBER_SHOW, this.onShow)
    this.$bus.off(STATUS_THROBBER_ERROR, this.onError)
    this.$bus.off(STATUS_THROBBER_HIDE, this.onHide)
  },

  methods: {
    onShow(message: string) {
      const $el: any = this.$refs.throbber
      $el.show(message)
    },

    onError(args: { message: string, error: any }) {
      const $el: any = this.$refs.throbber
      $el.error(args.message, args.error)
    },

    onHide() {
      const $el: any = this.$refs.throbber
      $el.hide()
    },
  }
})
</script>
