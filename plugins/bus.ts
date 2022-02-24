import {Plugin} from '@nuxt/types'
import Vue from "vue";

declare module 'vue/types/vue' {
  interface Vue {
    $bus: Vue
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $bus: Vue
  }

  interface Context {
    $bus: Vue
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $bus: Vue
  }
}

const plugin: Plugin = (context, inject) => {
  inject('bus', new Vue())
}

export default plugin
