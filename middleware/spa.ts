import { Middleware } from '@nuxt/types'

const auth: Middleware = (ctx) => {
  if (ctx.$setup.spa) return
  ctx.redirect(ctx.$urn.login())
}

export default auth
