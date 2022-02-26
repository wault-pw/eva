import {Plugin} from '@nuxt/types'
import {DIALOG_SHOW} from "~/components/Shared/DialogBus.vue"
import {DialogShowOpts} from "~/components/Shared/Dialog.vue"

interface IConfirmOpts {
  text: string
  yes?: string
  no?: string
}

interface IPromptOpts {
  text: string
  value?: string
  placeholder?: string
  yes?: string
  no?: string
}

class Dialog {
  private readonly $bus: Vue

  constructor(bus: Vue) {
    this.$bus = bus
  }

  confirm(opts: IConfirmOpts): Promise<void> {
    return new Promise((resolve, reject) => {
      this.$bus.$emit(DIALOG_SHOW, <DialogShowOpts>{
        resolve,
        reject,
        text: opts.text,
        yes: opts.yes,
      })
    })
  }

  prompt(opts: IPromptOpts) {
    return new Promise((resolve, reject) => {
      this.$bus.$emit(DIALOG_SHOW, <DialogShowOpts>{
        resolve,
        reject,
        value: opts.value,
        placeholder: opts.placeholder,
        text: opts.text,
        yes: opts.yes,
      } as DialogShowOpts)
    })
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: Dialog
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $dialog: Dialog
  }

  interface Context {
    $dialog: Dialog
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $dialog: Dialog
  }
}

const plugin: Plugin = (context, inject) => {
  inject('dialog', new Dialog(context.$bus))
}

export default plugin
