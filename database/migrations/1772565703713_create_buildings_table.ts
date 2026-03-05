import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'buildings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 255).notNullable()
      table.string('code', 20).notNullable().unique()
      table.text('description')

      table
        .integer('supervisor_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')

      table.decimal('cleanliness_score', 5, 2).defaultTo(100)
      table.boolean('is_active').defaultTo(false)

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
