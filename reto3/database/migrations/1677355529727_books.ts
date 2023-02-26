import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title',200).notNullable()
      table.integer('author').unsigned().notNullable()
      table.string('editorial',50).notNullable()
      table.string('format',50).notNullable()
      table.integer('pages').notNullable()
      table.integer('iduser').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
