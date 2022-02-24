<template>
  <StatusThrobber
    ref="throbber"
    :fixed="true"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import StatusThrobber from "~/components/Shared/StatusThrobber.vue"

export const STATUS_THROBBER_SHOW = "STATUS_THROBBER_SHOW"
export const STATUS_THROBBER_ERROR = "STATUS_THROBBER_ERROR"
export const STATUS_THROBBER_HIDE = "STATUS_THROBBER_HIDE"

export default Vue.extend({
  components: {StatusThrobber},

  mounted() {
    this.$bus.$on(STATUS_THROBBER_SHOW, this.onShow)
    this.$bus.$on(STATUS_THROBBER_ERROR, this.onError)
    this.$bus.$on(STATUS_THROBBER_HIDE, this.onHide)
  },

  beforeDestroy() {
    this.$bus.$off(STATUS_THROBBER_SHOW, this.onShow)
    this.$bus.$off(STATUS_THROBBER_ERROR, this.onError)
    this.$bus.$off(STATUS_THROBBER_HIDE, this.onHide)
  },

  methods: {
    onShow(message: string) {
      // @ts-ignore
      this.$refs.throbber?.show(message)
    },

    onError(message: string, error: any) {
      // @ts-ignore
      this.$refs.throbber?.error(message, error)
    },

    onHide() {
      // @ts-ignore
      this.$refs.throbber?.hide()
    },
  }
})
</script>
