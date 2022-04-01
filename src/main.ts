import {createApp, markRaw} from 'vue'
import {ComponentPublicInstance} from "@vue/runtime-core"
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia"
import {createI18n} from "vue-i18n"
import setupPlugin from "@/plugins/setup.plugin"
import verPlugin from "@/plugins/ver.plugin"
import urnPlugin from "@/plugins/urn.plugin"
import busPlugin from "@/plugins/bus.plugin"
import adapterPlugin from "@/plugins/adapter.plugin"
import throbberPlugin from "@/plugins/throbber.plugin"
import dialogPlugin from "@/plugins/dialog.plugin"
import VueToast from 'vue-toast-notification'
import en from "@/locales/en"
import ru from "@/locales/ru"
import zh from "@/locales/zh"

const i18n = createI18n({
    fallbackLocale: 'en',
    messages: {en, ru, zh}
})

const pinia = createPinia()
let root: ComponentPublicInstance

pinia.use(({store}) => {
    store.$adapter = markRaw(root.$adapter)
    store.$ver = markRaw(root.$ver)
})

root = createApp(App)
    .use(setupPlugin)
    .use(busPlugin)
    .use(urnPlugin)
    .use(throbberPlugin)
    .use(dialogPlugin)
    .use(verPlugin)
    .use(router)
    .use(adapterPlugin)
    .use(VueToast)
    .use(i18n)
    .use(pinia)
    .mount('#app')

root.$router.beforeEach(function () {
    i18n.global.locale = root.$setup.locale
})
