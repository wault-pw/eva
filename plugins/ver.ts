import {Plugin} from '@nuxt/types'
import {Ver, Ver1} from "~/lib/ver/ver"

declare module 'vue/types/vue' {
  interface Vue {
    $ver: Ver
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $ver: Ver
  }

  interface Context {
    $ver: Ver
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $ver: Ver
  }
}

const plugin: Plugin = (context, inject) => {
  inject('ver', Ver1)
}

export default plugin
