import {Plugin} from '@nuxt/types'

const plugin: Plugin = (context, inject) => {
  context.i18n.setLocale(context.$setup.locale)
}

export default plugin
