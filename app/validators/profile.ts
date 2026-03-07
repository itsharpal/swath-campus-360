import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const updateProfileValidator = vine.create({
  name: vine.string().trim().minLength(3).maxLength(255),
  phone: vine.string().trim().maxLength(20).optional(),
})

updateProfileValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Full name is required',
  'name.minLength': 'Full name must be at least 3 characters',
  'name.maxLength': 'Full name cannot exceed 255 characters',
  'phone.maxLength': 'Phone number cannot exceed 20 characters',
})
