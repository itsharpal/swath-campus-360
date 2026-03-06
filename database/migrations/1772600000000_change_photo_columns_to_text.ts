import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'change_photo_columns_to_text'

  public async up() {
    // Use raw SQL ALTER statements for reliable column type changes in MySQL
    await this.schema.raw('ALTER TABLE `complaints` MODIFY `photo_url` TEXT NULL')
    await this.schema.raw('ALTER TABLE `complaints` MODIFY `resolution_photo_url` TEXT NULL')
    await this.schema.raw('ALTER TABLE `job_cards` MODIFY `proof_photo_url` TEXT NULL')
  }

  public async down() {
    // Revert back to previous VARCHAR(500) size
    await this.schema.raw('ALTER TABLE `complaints` MODIFY `photo_url` VARCHAR(500)')
    await this.schema.raw('ALTER TABLE `complaints` MODIFY `resolution_photo_url` VARCHAR(500)')
    await this.schema.raw('ALTER TABLE `job_cards` MODIFY `proof_photo_url` VARCHAR(500)')
  }
}
