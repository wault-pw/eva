
import { Middleware } from '@nuxt/types'

const auth: Middleware = (ctx) => {
  if (ctx.$setup.mpa) return
  ctx.redirect(ctx.$urn.spa())
}

export default auth
