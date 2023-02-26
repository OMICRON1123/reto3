import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name',180).notNullable()
      table.string('surname',180).notNullable()
      table.integer('perfil').notNullable()
      table.string('type',20).notNullable()
      table.string('identity',50).notNullable()
      table.string('address',100).notNullable()
      table.string('barrio',50).notNullable()
      table.string('municipio',50).notNullable()
      table.string('departamento',50).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
