import { Plugin } from '@nuxt/types'
import {Setup} from "~/lib/setup"

declare module 'vue/types/vue' {
  interface Vue {
    $setup: Setup
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $setup: Setup
  }
  interface Context {
    $setup: Setup
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $setup: Setup
  }
}

const plugin: Plugin = (context, inject) => {
  inject('setup', new Setup(context.$config))
}

export default plugin
