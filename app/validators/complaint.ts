import vine from '@vinejs/vine'

export const createComplaintValidator = vine.create({
  zoneId: vine.number(),
  categoryId: vine.number(),
  description: vine.string().trim().nullable(),
  photoUrl: vine.string().nullable(),
  isAnonymous: vine.boolean(),
})

export const updateStatusValidator = vine.create({
  status: vine.enum(['in_progress']),
})

export const resolveComplaintValidator = vine.create({
  resolutionRemark: vine.string().trim().nullable(),
  resolutionPhotoUrl: vine.string().nullable(),
})
