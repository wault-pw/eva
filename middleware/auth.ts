import { Middleware } from '@nuxt/types'

const auth: Middleware = (ctx) => {
  if (ctx.store.getters["USER/IS_AUTHORIZED"]) return
  ctx.redirect(ctx.$urn.login())
}

export default auth
