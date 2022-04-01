import {Plugin} from "vue"
import {Ver, Ver1, Ver666} from "@/lib/ver"
import {Setup} from "@/lib/setup"

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $ver: Ver
    }
}

const plugin: Plugin = {
    install(app, options?) {
        const setup: Setup = app.config.globalProperties.$setup
        app.config.globalProperties.$ver = setup.ver666 ? Ver666 : Ver1
    }
}

export default plugin
