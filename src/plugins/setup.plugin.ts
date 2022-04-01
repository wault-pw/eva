import {Plugin} from "vue"
import {Setup} from "@/lib/setup"

declare global {
    interface Window { __setup__: any; }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $setup: Setup
    }
}

const plugin: Plugin = {
    install(app, options?) {
        app.config.globalProperties.$setup = new Setup(window.__setup__)
    }
}

export default plugin
