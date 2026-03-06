import vine from '@vinejs/vine'

/*
|--------------------------------------------------------------------------
| Create Zone
|--------------------------------------------------------------------------
*/

export const createZoneValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),

    zoneTypeId: vine.number(),

    cleaningFrequencyHours: vine.number().min(1).max(24).optional(),
  })
)

/*
|--------------------------------------------------------------------------
| Update Zone
|--------------------------------------------------------------------------
*/

export const updateZoneValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),

    zoneTypeId: vine.number(),

    cleaningFrequencyHours: vine.number().min(1).max(24).optional(),
  })
)
