import type { HttpContext } from '@adonisjs/core/http'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>, roles: string[]) {
    const user = ctx.auth.user

    if (!user) {
      return ctx.response.unauthorized({
        message: 'Authentication required',
      })
    }

    await user.load('role')

    if (!roles.includes(user.role.name)) {
      return ctx.response.forbidden({
        message: 'Access denied',
      })
    }

    await next()
  }
}
