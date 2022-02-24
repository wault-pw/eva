<template>
  <div
    :class="{'status-throbber-fixed': fixed, 'status-throbber-absolute': absolute}"
    class="status-throbber"
  >
    <transition name="status-throbber-backdrop-transition">
      <div
        v-if="shown"
        :style="{zIndex: zIndex}"
        class="status-throbber-backdrop"
      />
    </transition>

    <transition name="status-throbber-box-transition">
      <div
        v-if="shown"
        :style="{zIndex: zIndex + 1}"
        class="status-throbber-box"
      >
        <Throbber />

        <transition name="status-throbber-text-transition" mode="out-in">
          <span
            v-if="text"
            :key="text"
            v-text="text"
            class="text-uppercase"
          />
        </transition>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Throbber from "~/components/Shared/Throbber.vue"

interface IData {
  shown: boolean
  text: string | null
}

let TIMEOUT: null | ReturnType<typeof setTimeout>

export default Vue.extend({
  components: {Throbber},
  props: {
    absolute: {
      type: Boolean,
      required: false,
      default: false
    },

    fixed: {
      type: Boolean,
      required: false,
      default: false
    },

    zIndex: {
      type: Number,
      required: false,
      default: 9999,
    }
  },

  data(): IData {
    return {
      shown: false,
      text: null,
    }
  },

  methods: {
    show(text: string) {
      this.text = text
      this.shown = true
    },

    hide() {
      /**
       * If timeout is set, give it a time
       * to show an error text to a user,
       *
       * @example
       *
       * try {
       *   1/0
       * } catch {
       *   this.$throbber.error("ERROR")
       * } finally {
       *   this.$throbber.hide()
       * }
       */
      if (TIMEOUT !== null) return
      this.shown = false
    },

    error(text: string, error: any) {
      this.text = text
      console.error(error)
      TIMEOUT = setTimeout(this.forceHide, 1500)
    },

    forceHide() {
      TIMEOUT = null
      this.shown = false
    }
  }
})
</script>
