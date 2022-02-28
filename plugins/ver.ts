import {Plugin} from '@nuxt/types'
import {Ver, Ver1, Ver666} from "~/lib/ver/ver"

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

const plugin: Plugin = (ctx, inject) => {
  inject('ver', ctx.$setup.ver666 ? Ver666 : Ver1)
}

export default plugin
