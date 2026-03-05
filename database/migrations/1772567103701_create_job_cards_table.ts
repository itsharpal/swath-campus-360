import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'job_cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('complaint_id')
        .unsigned()
        .references('id')
        .inTable('complaints')
        .onDelete('SET NULL')

      table
        .integer('zone_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('zones')
        .onDelete('CASCADE')

      table
        .integer('supervisor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.enum('type', ['complaint_driven', 'scheduled']).notNullable()

      table.enum('status', ['pending', 'in_progress', 'completed']).defaultTo('pending')

      table.timestamp('scheduled_for', { useTz: true })
      table.timestamp('completed_at', { useTz: true })

      table.string('proof_photo_url', 500)
      table.text('remark')

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
