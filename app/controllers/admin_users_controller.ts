import type { HttpContext } from '@adonisjs/core/http'
import UsersService from '#services/admin_user_service'
import { createUserValidator, updateUserValidator } from '#validators/admin_user'
import Role from '#models/role'
import { inject } from '@adonisjs/core'

@inject()
export default class AdminUsersController {
  constructor(private service: UsersService) {}

  async index({ request, inertia }: HttpContext) {
    const page = request.input('page', 1)

    const paginatedUsers = await this.service.list(page)
    const users = paginatedUsers.serialize()

    return inertia.render('admin/users/index', {
      users,
    } as any)
  }

  async create({ inertia }: HttpContext) {
    const allRoles = await Role.all()
    const roles = allRoles.map((role) => role.serialize())

    return inertia.render('admin/users/create', {
      roles,
    } as any)
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    await this.service.create(payload)

    session.flash('success', 'User created successfully')

    return response.redirect().toRoute('admin.users.index')
  }

  async show({ params, inertia }: HttpContext) {
    const userRecord = await this.service.get(Number(params.id))
    const user = userRecord.serialize()

    return inertia.render('admin/users/show', {
      user,
    } as any)
  }

  async edit({ params, inertia }: HttpContext) {
    const userRecord = await this.service.get(Number(params.id))
    const user = userRecord.serialize()

    const allRoles = await Role.all()
    const roles = allRoles.map((role) => role.serialize())

    return inertia.render('admin/users/edit', {
      user,
      roles,
    } as any)
  }

  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)

    await this.service.update(params.id, payload)

    session.flash('success', 'User updated successfully')

    return response.redirect().toRoute('admin.users.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    await this.service.deactivate(params.id)

    session.flash('success', 'User deactivated')

    return response.redirect().back()
  }
}
