import {Plugin} from '@nuxt/types'
import {Urn} from "~/lib/urn"

declare module 'vue/types/vue' {
  interface Vue {
    $urn: Urn
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $urn: Urn
  }

  interface Context {
    $urn: Urn
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $urn: Urn
  }
}

const plugin: Plugin = (context, inject) => {
  inject('urn', new Urn())
}

export default plugin
