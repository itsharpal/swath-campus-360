import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'complaints'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('complaint_code', 20).notNullable().unique()

      table
        .integer('zone_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('zones')
        .onDelete('CASCADE')

      table.integer('floor_id').unsigned().notNullable().references('id').inTable('floors')

      table.integer('building_id').unsigned().notNullable().references('id').inTable('buildings')

      table.integer('reported_by').unsigned().references('id').inTable('users').onDelete('SET NULL')

      table.boolean('is_anonymous').defaultTo(false)

      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('complaint_categories')
        .onDelete('RESTRICT')

      table.text('description')
      table.string('photo_url', 500)

      table
        .enum('status', ['open', 'assigned', 'in_progress', 'resolved', 'overdue'])
        .defaultTo('open')

      table.enum('priority', ['low', 'medium', 'high']).notNullable()

      table.integer('assigned_supervisor_id').unsigned().references('id').inTable('users')

      table.integer('escalation_level').defaultTo(0)

      table.timestamp('reported_at', { useTz: true }).notNullable()
      table.timestamp('assigned_at', { useTz: true })
      table.timestamp('in_progress_at', { useTz: true })
      table.timestamp('resolved_at', { useTz: true })

      table.integer('resolution_time_minutes')

      table.string('resolution_photo_url', 500)
      table.text('resolution_remark')

      table.timestamps(true)

      table.index(['status'])
      table.index(['reported_at'])
      table.index(['assigned_supervisor_id'])
      table.index(['building_id'])
      table.index(['category_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
