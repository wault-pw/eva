import {Plugin} from "vue"
import {IBus} from "@/plugins/bus.plugin"
import {
    STATUS_THROBBER_SHOW,
    STATUS_THROBBER_ERROR,
    STATUS_THROBBER_HIDE,
    STATUS_THROBBER_FORCE_HIDE
} from "@/components/Shared/StatusThrobberBus.vue"

class Throbber {
    private readonly $bus: IBus

    constructor(bus: IBus) {
        this.$bus = bus
    }

    show(message: string, timeout?: number) {
        this.$bus.emit(STATUS_THROBBER_SHOW, {message, timeout})
    }

    error(message: string, error: any) {
        this.$bus.emit(STATUS_THROBBER_ERROR, {message, error})
    }

    hide() {
        this.$bus.emit(STATUS_THROBBER_HIDE)
    }

    forceHider() {
        this.$bus.emit(STATUS_THROBBER_FORCE_HIDE)
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $throbber: Throbber
    }
}

const plugin: Plugin = {
    install(app, options?) {
        app.config.globalProperties.$throbber = new Throbber(app.config.globalProperties.$bus)
    }
}

export default plugin
