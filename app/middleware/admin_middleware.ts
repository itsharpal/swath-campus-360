import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Admin middleware limits access to users with admin role id (1).
 */
export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user

    if (!user) {
      return ctx.response.redirect('/login')
    }

    if (Number(user.roleId) !== 1) {
      return ctx.response.forbidden({
        message: 'Admin access required',
      })
    }

    return next()
  }
}
