import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'zones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('floor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('floors')
        .onDelete('CASCADE')

      table
        .integer('building_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('buildings')
        .onDelete('CASCADE')

      table
        .integer('zone_type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('zone_types')
        .onDelete('RESTRICT')

      table.string('name', 255).notNullable()

      table.string('qr_code', 255).unique()

      table.integer('cleaning_frequency_hours').defaultTo(4)

      table.decimal('cleanliness_score', 5, 2).defaultTo(100)

      table.timestamp('last_cleaned_at', { useTz: true })

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
