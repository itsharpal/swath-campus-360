import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Floor from './floor.ts'
import Building from './building.ts'
import ZoneType from './zone_type.ts'
import Complaint from './complaint.ts'
import JobCard from './job_card.ts'
import { DateTime } from 'luxon'

export default class Zone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare floorId: number

  @column()
  declare buildingId: number

  @column()
  declare zoneTypeId: number

  @column()
  declare name: string

  @column()
  declare qrCode: string | null

  @column()
  declare cleaningFrequencyHours: number

  @column()
  declare cleanlinessScore: number

  @column.dateTime()
  declare lastCleanedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /* RELATIONS */

  @belongsTo(() => Floor)
  declare floor: BelongsTo<typeof Floor>

  @belongsTo(() => Building)
  declare building: BelongsTo<typeof Building>

  @belongsTo(() => ZoneType)
  declare zoneType: BelongsTo<typeof ZoneType>

  @hasMany(() => Complaint)
  declare complaints: HasMany<typeof Complaint>

  @hasMany(() => JobCard)
  declare jobCards: HasMany<typeof JobCard>
}
