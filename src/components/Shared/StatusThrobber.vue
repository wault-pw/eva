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
import {defineComponent} from 'vue'
import Throbber from "@/components/Shared/Throbber.vue"

interface IData {
  shown: boolean
  backdrop: boolean
  fired: boolean
  text: string | null
}

let SHOW_TIMEOUT: undefined | ReturnType<typeof setTimeout>
let HIDE_TIMEOUT: undefined | ReturnType<typeof setTimeout>
let BACKDROP_TIMEOUT: undefined | ReturnType<typeof setTimeout>

function cleatShowTimeout() {
  clearTimeout(SHOW_TIMEOUT)
  SHOW_TIMEOUT = undefined
}

function cleatHideTimeout() {
  clearTimeout(HIDE_TIMEOUT)
  HIDE_TIMEOUT = undefined
}

function clearBackdropTimeout() {
  clearTimeout(BACKDROP_TIMEOUT)
  BACKDROP_TIMEOUT = undefined
}

export default defineComponent({
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
      }
    }
  },

  methods: {
    shot(text: string) {
      this.text = text
      this.fired = true
      HIDE_TIMEOUT = setTimeout(this.forceHide, 800)
    },

    show(text: string, timeout?: number) {
      /**
       * sometimes show is lined up because of the animation and
       * "hide" function might be call in the middle of the queue.
       */
      if (HIDE_TIMEOUT) return

      SHOW_TIMEOUT = setTimeout(() => {
        this.text = text
        this.shown = true
      }, timeout ?? 0)
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
      if (HIDE_TIMEOUT) return
      this.forceHide()
    },

    error(text: string, error: any) {
      this.text = text
      console.error(error)
      HIDE_TIMEOUT = setTimeout(this.forceHide, 1500)
    },

    forceHide() {
      clearBackdropTimeout()
      cleatShowTimeout()
      cleatHideTimeout()
      this.shown = false
      this.fired = false
      this.backdrop = false
    }
  }
});
</script>
