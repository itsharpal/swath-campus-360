import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'complaint_votes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('complaint_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('complaints')
        .onDelete('CASCADE')

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true)

      table.unique(['complaint_id', 'user_id'])
      table.index(['complaint_id'])
      table.index(['user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
