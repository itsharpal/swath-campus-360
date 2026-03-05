import User from '#models/user'
import Role from '#models/role'
import { Exception } from '@adonisjs/core/exceptions'

export default class UsersService {
  async list(page: number = 1) {
    return User.query().preload('role').orderBy('created_at', 'desc').paginate(page, 10)
  }

  async create(data: any) {
    const existing = await User.findBy('email', data.email)

    if (existing) {
      throw new Exception('Email already exists', { status: 422 })
    }

    const role = await Role.find(data.roleId)

    if (!role) {
      throw new Exception('Invalid role', { status: 422 })
    }

    const user = await User.create(data)

    await user.load('role')

    return user
  }

  async get(id: number) {
    const user = await User.query().where('id', id).preload('role').first()

    if (!user) {
      throw new Exception('User not found', { status: 404 })
    }

    return user
  }

  async update(id: number, data: any) {
    const user = await User.find(id)

    if (!user) {
      throw new Exception('User not found', { status: 404 })
    }

    if (data.email && data.email !== user.email) {
      const existing = await User.findBy('email', data.email)

      if (existing) {
        throw new Exception('Email already in use', { status: 422 })
      }
    }

    if (data.roleId) {
      const role = await Role.find(data.roleId)

      if (!role) {
        throw new Exception('Invalid role', { status: 422 })
      }
    }

    user.merge(data)

    await user.save()

    return user
  }

  async deactivate(id: number) {
    const user = await User.find(id)

    if (!user) {
      throw new Exception('User not found', { status: 404 })
    }

    user.isActive = false

    await user.save()

    return user
  }
}
