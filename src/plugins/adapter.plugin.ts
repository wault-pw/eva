import {Plugin} from "vue"
import {IAdapter} from "@/lib/adapter/adapter.interface"
import {Setup} from "@/lib/setup"
import AdapterMpa from "@/lib/adapter/adapter.mpa"
import {AdapterSpa} from "@/lib/adapter/adapter.spa"

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $adapter: IAdapter
    }
}

declare global {
    interface Window {
        __DUMP__: Uint8Array
    }
}

const plugin: Plugin = {
    install(app, options?) {
        const setup: Setup = app.config.globalProperties.$setup

        if (setup.mpa) {
            app.config.globalProperties.$adapter = new AdapterMpa(setup.aliceUrl)
        }

        if (setup.spa) {
            app.config.globalProperties.$adapter = new AdapterSpa(window.__DUMP__)
        }
    }
}

export default plugin
