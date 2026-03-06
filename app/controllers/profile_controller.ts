import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async show({ auth, inertia }: HttpContext) {
    const user = auth.user!
    await user.load('role')

    return inertia.render('profile/show' as any, {
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role?.name ?? 'User',
        emailVerifiedAt: user.emailVerifiedAt,
        createdAt: user.createdAt,
      },
    })
  }
}
