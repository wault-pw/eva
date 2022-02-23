import {Plugin} from '@nuxt/types'
import {IAdapter} from "~/lib/adapter/adapter.type"
import {AdapterMpa} from "~/lib/adapter/adapter.mpa"

declare module 'vue/types/vue' {
  interface Vue {
    $adapter: IAdapter
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $adapter: IAdapter
  }

  interface Context {
    $adapter: IAdapter
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $adapter: IAdapter
  }
}

const plugin: Plugin = (context, inject) => {
  inject('adapter', new AdapterMpa(context.$axios))
}

export default plugin
