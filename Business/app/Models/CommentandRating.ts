import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class CommentandRating extends BaseModel {
  public static table = 'commentsandratings'
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_id: number

  @belongsTo(() => Service, {
    foreignKey: 'service_id',
  })
  public service: BelongsTo<typeof Service>

  @column()
  public byCustomer: boolean

  @column()
  public description: string

  @column()
  public rating: number

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
