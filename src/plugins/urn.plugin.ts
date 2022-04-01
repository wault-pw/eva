import {Plugin} from "vue"
import {Urn} from "@/lib/urn"

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $urn: Urn
    }
}

const plugin: Plugin = {
    install(app, options?) {
        app.config.globalProperties.$urn = new Urn()
    }
}

export default plugin
