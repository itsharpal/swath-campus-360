import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),

    email: vine.string().trim().email().maxLength(255),

    password: vine.string().minLength(8).maxLength(255),

    roleId: vine.number().positive(),

    phone: vine.string().trim().maxLength(20).optional(),

    isActive: vine.boolean().optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),

    email: vine.string().trim().email().maxLength(255).optional(),

    password: vine.string().minLength(8).maxLength(255).optional(),

    roleId: vine.number().positive().optional(),

    phone: vine.string().trim().maxLength(20).optional(),

    isActive: vine.boolean().optional(),
  })
)
