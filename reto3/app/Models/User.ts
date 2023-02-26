import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Book from 'App/Models/Book'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string
  
  @column()
  public name: string

  @column()
  public surname: string

  @column()
  public perfil: number

  @column()
  public type: string
  
  @column()
  public identity: string

  @column()
  public address: string

  @column()
  public barrio: string

  @column()
  public municipio: string

  @column()
  public departamento: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Book)
  public books: HasMany<typeof Book>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
