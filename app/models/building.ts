import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import User from './user.ts'
import Floor from './floor.ts'
import Zone from './zone.ts'
import Complaint from './complaint.ts'
import { DateTime } from 'luxon'

export default class Building extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare code: string

  @column()
  declare description: string | null

  @column()
  declare supervisorId: number | null

  @column()
  declare cleanlinessScore: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /* RELATIONS */

  @belongsTo(() => User, {
    foreignKey: 'supervisorId',
  })
  declare supervisor: BelongsTo<typeof User>

  @hasMany(() => Floor)
  declare floors: HasMany<typeof Floor>

  @hasMany(() => Zone)
  declare zones: HasMany<typeof Zone>

  @hasMany(() => Complaint)
  declare complaints: HasMany<typeof Complaint>
}
