import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Complaint from './complaint.js'
import User from './user.js'

export default class ComplaintVote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare complaintId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Complaint)
  declare complaint: BelongsTo<typeof Complaint>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
