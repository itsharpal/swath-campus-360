import vine from '@vinejs/vine'

export const createComplaintValidator = vine.create({
  zoneId: vine.number(),
  categoryId: vine.number(),
  description: vine.string().trim().nullable(),
})

export const updateStatusValidator = vine.create({
  status: vine.enum(['in_progress']),
})

export const resolveComplaintValidator = vine.create({
  // We validate the remark here; the photo will be uploaded as a file (multipart)
  // and handled separately in the controller.
  resolutionRemark: vine.string().trim().nullable(),
})
