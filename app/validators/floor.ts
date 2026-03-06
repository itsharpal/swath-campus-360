import vine from '@vinejs/vine'

/*
|--------------------------------------------------------------------------
| Create Floor Validator
|--------------------------------------------------------------------------
*/

export const createFloorValidator = vine.compile(
  vine.object({
    floorNumber: vine.number().min(0),
    name: vine.string().trim().minLength(2).maxLength(100),
  })
)

/*
|--------------------------------------------------------------------------
| Update Floor Validator
|--------------------------------------------------------------------------
*/

export const updateFloorValidator = vine.compile(
  vine.object({
    floorNumber: vine.number().min(0),
    name: vine.string().trim().minLength(2).maxLength(100),
  })
)
