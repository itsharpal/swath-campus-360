import type { HttpContext } from '@adonisjs/core/http'
import { updateProfileValidator } from '#validators/profile'

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

  async update({ auth, request, response, session }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(updateProfileValidator)

    user.name = payload.name
    user.merge({
      phone: payload.phone?.trim() || null,
    } as any)

    await user.save()

    session.flash('success', 'Profile updated successfully')
    return response.redirect().toRoute('profile.show')
  }
}
