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
            const adapter = new AdapterMpa(setup.aliceUrl)
            adapter.toast = function(text: string) {
                // timeout is used to show tooltip after notification throbber
                // had been disappeared
                setTimeout(() => app._context.provides.$toast.default(text), 1800)
            }
            app.config.globalProperties.$adapter = adapter
        }

        if (setup.spa) {
            app.config.globalProperties.$adapter = new AdapterSpa(window.__DUMP__)
        }
    }
}

export default plugin
