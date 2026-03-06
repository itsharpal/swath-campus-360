import vine from '@vinejs/vine'

/**
 * Start job validation
 */
export const startJobValidator = vine.create({
  status: vine.enum(['in_progress']),
})

/**
 * Complete job validation
 */
export const completeJobValidator = vine.create({
  proofPhotoUrl: vine.string().nullable(),
  remark: vine.string().trim().nullable(),
})
