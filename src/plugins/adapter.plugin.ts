import {Plugin} from "vue"
import {IAdapter} from "@/lib/adapter/adapter.interface"
import {Setup} from "@/lib/setup"
import AdapterMpa from "@/lib/adapter/adapter.mpa"

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $adapter: IAdapter
    }
}

const plugin: Plugin = {
    install(app, options?) {
        const setup: Setup = app.config.globalProperties.$setup
        app.config.globalProperties.$adapter = new AdapterMpa(setup.aliceUrl)
    }
}

export default plugin
