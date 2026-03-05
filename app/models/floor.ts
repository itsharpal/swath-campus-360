import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Building from './building.ts'
import Zone from './zone.ts'
import { DateTime } from 'luxon'

export default class Floor extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare buildingId: number

  @column()
  declare floorNumber: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /* RELATIONS */

  @belongsTo(() => Building)
  declare building: BelongsTo<typeof Building>

  @hasMany(() => Zone)
  declare zones: HasMany<typeof Zone>
}
