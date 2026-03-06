import {
  BaseModel,
  column,
  belongsTo,
  hasMany,
  beforeCreate,
  beforeSave,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Zone from './zone.js'
import Building from './building.js'
import Floor from './floor.js'
import User from './user.js'
import ComplaintCategory from './complaint_category.js'
import JobCard from './job_card.js'
import ComplaintVote from './complaint_vote.js'
import { DateTime } from 'luxon'

export default class Complaint extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare complaintCode: string

  @column()
  declare zoneId: number

  @column()
  declare floorId: number

  @column()
  declare buildingId: number

  @column()
  declare reportedBy: number | null

  @column()
  declare isAnonymous: boolean

  @column()
  declare categoryId: number

  @column()
  declare description: string | null

  @column()
  declare photoUrl: string | null

  @column()
  declare status: string

  @column()
  declare priority: string

  @column()
  declare assignedSupervisorId: number | null

  @column()
  declare escalationLevel: number

  @column.dateTime()
  declare reportedAt: DateTime

  @column.dateTime()
  declare assignedAt: DateTime | null

  @column.dateTime()
  declare inProgressAt: DateTime | null

  @column.dateTime()
  declare resolvedAt: DateTime | null

  @column()
  declare resolutionTimeMinutes: number | null

  @column()
  declare resolutionPhotoUrl: string | null

  @column()
  declare resolutionRemark: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /* RELATIONS */

  @belongsTo(() => Zone)
  declare zone: BelongsTo<typeof Zone>

  @belongsTo(() => Floor)
  declare floor: BelongsTo<typeof Floor>

  @belongsTo(() => Building)
  declare building: BelongsTo<typeof Building>

  @belongsTo(() => User, {
    foreignKey: 'reportedBy',
  })
  declare reporter: BelongsTo<typeof User>

  @belongsTo(() => ComplaintCategory, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof ComplaintCategory>

  @hasMany(() => JobCard)
  declare jobCards: HasMany<typeof JobCard>

  @hasMany(() => ComplaintVote)
  declare votes: HasMany<typeof ComplaintVote>

  @beforeCreate()
  static generateComplaintCode(complaint: Complaint) {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 9000) + 1000
    complaint.complaintCode = `COMP-${year}-${random}`
  }

  @beforeCreate()
  static setReportedTime(complaint: Complaint) {
    complaint.reportedAt = DateTime.now()
  }

  @beforeSave()
  static calculateResolutionTime(complaint: Complaint) {
    if (complaint.resolvedAt && complaint.reportedAt) {
      const minutes = complaint.resolvedAt.diff(complaint.reportedAt, 'minutes').minutes

      complaint.resolutionTimeMinutes = Math.floor(minutes)
    }
  }
}
