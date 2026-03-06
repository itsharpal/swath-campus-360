import vine from '@vinejs/vine'

export const createBuildingValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),

    code: vine.string().trim().minLength(2).maxLength(20),

    description: vine.string().trim().nullable().optional(),

    supervisorId: vine.number().positive().optional(),
  })
)

export const updateBuildingValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),

    code: vine.string().trim().minLength(2).maxLength(20).optional(),

    description: vine.string().trim().nullable().optional(),

    supervisorId: vine.number().positive().nullable().optional(),
  })
)
