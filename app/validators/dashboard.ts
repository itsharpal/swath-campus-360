import vine from '@vinejs/vine'

export const dashboardFilterValidator = vine.create({
  from: vine.string().optional(),
  to: vine.string().optional(),
})
