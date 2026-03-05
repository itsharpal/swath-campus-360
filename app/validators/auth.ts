import vine from '@vinejs/vine'

export const loginValidator = vine.create({
  email: vine.string().email(),
  password: vine.string().minLength(6),
})

export const registerValidator = vine.create({
  name: vine.string().minLength(3).maxLength(255),

  email: vine.string().email(),

  password: vine.string().minLength(6),

  role: vine.enum(['student', 'teacher', 'supervisor', 'admin', 'contractor']),

  phone: vine.string().optional(),
})
