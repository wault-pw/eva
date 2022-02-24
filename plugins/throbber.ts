import {Plugin} from '@nuxt/types'
import {
  STATUS_THROBBER_SHOW,
  STATUS_THROBBER_HIDE,
  STATUS_THROBBER_ERROR
} from "~/components/Shared/StatusThrobberBus.vue"

class Throbber {
  private readonly $bus: Vue

  constructor(bus: Vue) {
    this.$bus = bus
  }

  show(text: string) {
    this.$bus.$emit(STATUS_THROBBER_SHOW, text)
  }

  error(text: string, error: any) {
    this.$bus.$emit(STATUS_THROBBER_ERROR, text, error)
  }

  hide() {
    this.$bus.$emit(STATUS_THROBBER_HIDE)
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $throbber: Throbber
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $throbber: Throbber
  }

  interface Context {
    $throbber: Throbber
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $throbber: Throbber
  }
}

const plugin: Plugin = (context, inject) => {
  inject('throbber', new Throbber(context.$bus))
}

export default plugin
