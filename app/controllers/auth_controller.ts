import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Role from '#models/role'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  /*
  |-----------------------------------------
  | Show Login Page
  |-----------------------------------------
  */
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  /*
  |-----------------------------------------
  | Login
  |-----------------------------------------
  */
  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.query().where('email', email).preload('role').first()

    if (!user) {
      session.flash('error', 'Invalid credentials')
      return response.redirect().back()
    }

    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      session.flash('error', 'Invalid credentials')
      return response.redirect().back()
    }

    if (!user.isActive) {
      session.flash('error', 'Account is inactive')
      return response.redirect().back()
    }

    await auth.use('web').login(user)

    return response.redirect(this.redirectByRole(user.roleId))
  }

  /*
  |-----------------------------------------
  | Show Register Page
  |-----------------------------------------
  */
  async showRegister({ inertia }: HttpContext) {
    const roles = await Role.query().select('id', 'name')

    return inertia.render('auth/register', {
      roles,
    })
  }

  /*
  |-----------------------------------------
  | Register User
  |-----------------------------------------
  */
  async register({ request, response, session }: HttpContext) {
    const data = request.only(['name', 'email', 'password', 'roleId', 'phone'])

    const existingUser = await User.findBy('email', data.email)

    if (existingUser) {
      session.flash('error', 'Email already exists')
      return response.redirect().back()
    }

    await User.create({
      name: data.name,
      email: data.email,
      password: await hash.make(data.password),
      roleId: data.roleId,
      phone: data.phone,
      isActive: true,
    })

    return response.redirect('/login')
  }

  /*
  |-----------------------------------------
  | Logout
  |-----------------------------------------
  */
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }

  /*
  |-----------------------------------------
  | Role Redirect Helper
  |-----------------------------------------
  */
  private redirectByRole(roleId: number) {
    switch (roleId) {
      case 1:
        return '/admin/dashboard'

      case 2:
        return '/supervisor/dashboard'

      case 3:
        return '/contractor/dashboard'

      case 4:
        return '/student/dashboard'

      default:
        return '/'
    }
  }
}
