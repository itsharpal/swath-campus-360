import { BaseModel, column, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Complaint from './complaint.js'
import Zone from './zone.js'
import User from './user.js'
import { DateTime } from 'luxon'

export default class JobCard extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare complaintId: number | null

  @column()
  declare zoneId: number

  @column()
  declare supervisorId: number

  @column()
  declare type: string

  @column()
  declare status: string

  @column.dateTime()
  declare scheduledFor: DateTime | null

  @column.dateTime()
  declare completedAt: DateTime | null

  @column()
  declare proofPhotoUrl: string | null

  @column()
  declare remark: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /* RELATIONS */

  @belongsTo(() => Complaint)
  declare complaint: BelongsTo<typeof Complaint>

  @belongsTo(() => Zone)
  declare zone: BelongsTo<typeof Zone>

  @belongsTo(() => User, {
    foreignKey: 'supervisorId',
  })
  declare supervisor: BelongsTo<typeof User>

  @beforeSave()
  static setCompletionTime(job: JobCard) {
    if (job.$dirty.status === 'completed' && !job.completedAt) {
      job.completedAt = DateTime.now()
    }
  }
}
