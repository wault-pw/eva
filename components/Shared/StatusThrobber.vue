<template>
  <div
    :class="{'status-throbber-fixed': fixed, 'status-throbber-absolute': absolute}"
    class="status-throbber"
  >
    <transition name="status-throbber-backdrop-transition">
      <div
        v-if="backdrop"
        :style="{zIndex: zIndex}"
        class="status-throbber-backdrop"
      />
    </transition>

    <transition name="status-throbber-box-transition">
      <div
        v-if="fired || shown"
        :style="{zIndex: zIndex + 1}"
        class="status-throbber-box"
      >
        <Throbber/>

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
  backdrop: boolean
  fired: boolean
  text: string | null
}

let HIDE_TIMEOUT: null | ReturnType<typeof setTimeout>
let BACKDROP_TIMEOUT: null | ReturnType<typeof setTimeout>

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
      backdrop: false,
      shown: false,
      fired: false,
      text: null,
    }
  },

  watch: {
    shown(val) {
      if (val) {
        // to prevent interface blocking with fast loading
        BACKDROP_TIMEOUT = setTimeout(() => this.backdrop = true, 400)
      } else {
        BACKDROP_TIMEOUT && clearTimeout(BACKDROP_TIMEOUT)
      }
    }
  },

  methods: {
    shot(text: string) {
      this.text = text
      this.fired = true
      HIDE_TIMEOUT = setTimeout(this.forceHide, 800)
    },

    show(text: string) {
      /**
       * sometimes show is lined up because of the animation and
       * "hide" function might be call in the middle of the queue.
       */
      if (HIDE_TIMEOUT != null) return
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
      if (HIDE_TIMEOUT != null) return
      this.shown = false
      this.fired = false
      this.backdrop = false
    },

    error(text: string, error: any) {
      this.text = text
      console.error(error)
      HIDE_TIMEOUT = setTimeout(this.forceHide, 1500)
    },

    forceHide() {
      HIDE_TIMEOUT = null
      this.shown = false
      this.fired = false
      this.backdrop = false
    }
  }
})
</script>
