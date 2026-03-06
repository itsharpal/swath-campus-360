import vine from '@vinejs/vine'

/*
|--------------------------------------------------------------------------
| Create Building
|--------------------------------------------------------------------------
*/

export const createBuildingValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),

    code: vine.string().trim().minLength(2).maxLength(20),

    description: vine.string().trim().optional(),

    supervisorId: vine.number().optional(),
  })
)

/*
|--------------------------------------------------------------------------
| Update Building
|--------------------------------------------------------------------------
*/

export const updateBuildingValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),

    code: vine.string().trim().minLength(2).maxLength(20),

    description: vine.string().trim().optional(),

    supervisorId: vine.number().optional(),
  })
)
