import {Plugin} from "vue"
import mitt, {Emitter} from "mitt"

export type IBus = Emitter<Record<any, any>>

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $bus: IBus
    }
}

const plugin: Plugin = {
    install(app, options?) {
        app.config.globalProperties.$bus = mitt()
    }
}

export default plugin
