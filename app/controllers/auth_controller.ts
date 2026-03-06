import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Role from '#models/role'
import router from '@adonisjs/core/services/router'
import { DateTime } from 'luxon'
import { appUrl } from '#config/app'
import mail from '@adonisjs/mail/services/main'

export default class AuthController {
  private readonly allowedRoleNames = ['student', 'teacher']
  private readonly scetEmailRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*@scet\.ac\.in$/i
  private readonly verificationPurpose = 'email_verification'

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
    const normalizedEmail = email.trim().toLowerCase()

    let user: User
    try {
      user = await User.verifyCredentials(normalizedEmail, password)
    } catch {
      session.flash('error', 'Invalid credentials')
      return response.redirect().back()
    }

    if (!user.isActive) {
      session.flash('error', 'Account is inactive')
      return response.redirect().back()
    }

    if (!user.emailVerifiedAt) {
      const emailSent = await this.sendVerificationEmail(user)

      session.flash('error', 'Please verify your email before logging in')
      if (emailSent) {
        session.flash('success', 'A fresh verification email has been sent to your inbox')
      } else {
        session.flash('error', 'Unable to send verification email. Please contact support')
      }
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
    const allRoles = await Role.query().select('id', 'name')
    const roles = allRoles.filter((role) => this.allowedRoleNames.includes(role.name.toLowerCase()))

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
    const data = request.only([
      'name',
      'email',
      'password',
      'passwordConfirmation',
      'roleId',
      'phone',
    ])

    const normalizedEmail = data.email.trim().toLowerCase()

    if (!this.scetEmailRegex.test(normalizedEmail)) {
      session.flash('error', 'Only @scet.ac.in email addresses are allowed')
      return response.redirect().back()
    }

    if (data.password !== data.passwordConfirmation) {
      session.flash('error', 'Password and confirm password do not match')
      return response.redirect().back()
    }

    const allowedRoles = await Role.query().whereIn('name', this.allowedRoleNames)
    const allowedRoleIds = allowedRoles.map((role) => role.id)
    const selectedRoleId = Number(data.roleId)

    if (!allowedRoleIds.includes(selectedRoleId)) {
      session.flash('error', 'Only student and teacher roles can register')
      return response.redirect().back()
    }

    const existingUser = await User.findBy('email', normalizedEmail)

    if (existingUser) {
      session.flash('error', 'Email already exists')
      return response.redirect().back()
    }

    const user = await User.create({
      name: data.name,
      email: normalizedEmail,
      password: data.password,
      roleId: selectedRoleId,
      phone: data.phone,
      isActive: true,
    })

    const emailSent = await this.sendVerificationEmail(user)
    if (emailSent) {
      session.flash(
        'success',
        'Registration successful. Please verify your email before logging in'
      )
    } else {
      session.flash(
        'error',
        'Registration successful, but verification email could not be sent. Please contact support'
      )
    }

    return response.redirect('/login')
  }

  async verifyEmail({ request, params, response, session }: HttpContext) {
    if (!request.hasValidSignature(this.verificationPurpose)) {
      session.flash('error', 'Verification link is invalid or expired')
      return response.redirect('/login')
    }

    const userId = Number(params.id)
    const user = await User.find(userId)

    if (!user) {
      session.flash('error', 'User not found')
      return response.redirect('/login')
    }

    if (!user.emailVerifiedAt) {
      user.emailVerifiedAt = DateTime.now()
      await user.save()
    }

    session.flash('success', 'Email verified successfully. You can now login')
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

  private createVerificationLink(userId: number) {
    return router.makeSignedUrl(
      'auth.verify_email',
      { id: userId },
      {
        expiresIn: '1h',
        purpose: this.verificationPurpose,
        prefixUrl: appUrl,
      }
    )
  }

  private async sendVerificationEmail(user: User) {
    const verificationLink = this.createVerificationLink(user.id)

    try {
      await mail.send((message) => {
        message
          .to(user.email)
          .subject('Verify your email address - Swachh 360')
          .html(
            `<p>Hello ${user.name},</p><p>Please verify your email by clicking the link below:</p><p><a href="${verificationLink}">${verificationLink}</a></p><p>This link will expire in 1 hour.</p>`
          )
          .text(
            `Hello ${user.name},\n\nPlease verify your email by opening this link:\n${verificationLink}\n\nThis link will expire in 1 hour.`
          )
      })

      return true
    } catch (error) {
      console.error('Failed to send verification email', error)
      return false
    }
  }
}
