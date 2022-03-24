import Vue from 'vue'
import VueToast, {ToastApi} from "vue-toast-notification"
import {Plugin} from "@nuxt/types"

export {ToastApi} from "vue-toast-notification"

Vue.use(VueToast, {
  // position: 'bottom',
  type: 'default'
})

declare module 'vue/types/vue' {
  interface Vue {
    $toast: ToastApi
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $toast: ToastApi
  }

  interface Context {
    $toast: ToastApi
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $toast: ToastApi
  }
}

const plugin: Plugin = (context, inject) => {
  inject('toast', Vue.$toast)
}

export default plugin
