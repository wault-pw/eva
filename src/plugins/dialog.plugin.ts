import {Plugin} from "vue"
import {IBus} from "@/plugins/bus.plugin"
import {DialogShowOpts} from "@/components/Shared/Dialog.vue"
import {DIALOG_SHOW} from "@/components/Shared/DialogBus.vue"

interface IConfirmOpts {
    text: string
    yes?: string
    no?: string
}

interface IPromptOpts {
    text: string
    verify?: boolean
    value?: string
    placeholder?: string
    yes?: string
    no?: string
}

class Dialog {
    private readonly $bus: IBus

    constructor(bus: IBus) {
        this.$bus = bus
    }

    confirm(opts: IConfirmOpts): Promise<void> {
        return new Promise((resolve, reject) => {
            this.$bus.emit(DIALOG_SHOW, <DialogShowOpts>{
                resolve,
                reject,
                text: opts.text,
                yes: opts.yes,
            })
        })
    }

    prompt(opts: IPromptOpts) {
        return new Promise((resolve, reject) => {
            this.$bus.emit(DIALOG_SHOW, <DialogShowOpts>{
                resolve,
                reject,
                verify: opts.verify,
                value: opts.value,
                placeholder: opts.placeholder,
                text: opts.text,
                yes: opts.yes,
            } as DialogShowOpts)
        })
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $dialog: Dialog
    }
}

const plugin: Plugin = {
    install(app, options?) {
        app.config.globalProperties.$dialog = new Dialog(app.config.globalProperties.$bus)
    }
}

export default plugin
