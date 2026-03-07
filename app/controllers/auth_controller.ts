import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Role from '#models/role'
import router from '@adonisjs/core/services/router'
import { DateTime } from 'luxon'
import { appUrl } from '#config/app'
import mail from '@adonisjs/mail/services/main'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  private readonly allowedRoleNames = ['student', 'teacher']
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
    const data = await request.validateUsing(loginValidator)
    const normalizedEmail = data.email.trim().toLowerCase()

    let user: User
    try {
      user = await User.verifyCredentials(normalizedEmail, data.password)
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

    return response.redirect(await this.redirectByRole(user))
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
    const data = await request.validateUsing(registerValidator)

    const normalizedEmail = data.email.trim().toLowerCase()

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

  async verifyEmail({ request, params, inertia }: HttpContext) {
    if (!request.hasValidSignature(this.verificationPurpose)) {
      return inertia.render('auth/verify_email' as any, {
        status: 'error',
        title: 'Verification Link Invalid',
        message: 'This verification link is invalid or has expired. Please login to request a new verification email.',
      })
    }

    const userId = Number(params.id)
    const user = await User.find(userId)

    if (!user) {
      return inertia.render('auth/verify_email' as any, {
        status: 'error',
        title: 'User Not Found',
        message: 'We could not find an account for this verification link.',
      })
    }

    if (user.emailVerifiedAt) {
      return inertia.render('auth/verify_email' as any, {
        status: 'info',
        title: 'Email Already Verified',
        message: 'Your email address is already verified. You can login normally.',
      })
    }

    if (!user.emailVerifiedAt) {
      user.emailVerifiedAt = DateTime.now()
      await user.save()
    }

    return inertia.render('auth/verify_email' as any, {
      status: 'success',
      title: 'Email Verified Successfully',
      message: 'Your email has been verified. You can now login to your account.',
    })
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
  private async redirectByRole(user: User) {
    await user.load('role')
    const roleName = user.role?.name?.toLowerCase()

    switch (roleName) {
      case 'admin':
        return '/admin/dashboard'

      case 'supervisor':
        return '/supervisor/dashboard'

      // Teacher/student users land on public complaint listing.
      case 'teacher':
      case 'student':
        return '/complaints'

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
