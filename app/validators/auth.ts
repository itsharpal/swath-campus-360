import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const loginValidator = vine.create({
  email: vine.string().trim().email(),
  password: vine.string().trim().minLength(6),
})

loginValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'Email is required',
  'email.email': 'Enter a valid email address',
  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 6 characters',
})

export const registerValidator = vine.create({
  name: vine.string().trim().minLength(3).maxLength(255),

  email: vine
    .string()
    .trim()
    .email()
    .regex(/^[a-z0-9]+(?:\.[a-z0-9]+)*@scet\.ac\.in$/i),

  password: vine
    .string()
    .trim()
    .minLength(6)
    .confirmed({
      confirmationField: 'passwordConfirmation',
    }),

  passwordConfirmation: vine.string().trim().minLength(6),

  roleId: vine.string().trim().regex(/^\d+$/),

  phone: vine.string().trim().maxLength(20).optional(),
})

registerValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Full name is required',
  'name.minLength': 'Full name must be at least 3 characters',
  'name.maxLength': 'Full name cannot exceed 255 characters',

  'email.required': 'Email is required',
  'email.email': 'Enter a valid email address',
  'email.regex': 'Only @scet.ac.in email addresses are allowed',

  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 6 characters',
  'password.confirmed': 'Password and confirm password do not match',

  'passwordConfirmation.required': 'Confirm password is required',
  'passwordConfirmation.minLength': 'Confirm password must be at least 6 characters',

  'roleId.required': 'Role is required',
  'roleId.regex': 'Select a valid role',

  'phone.maxLength': 'Phone number cannot exceed 20 characters',
})
