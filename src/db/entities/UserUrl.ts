/*eslint-disable import/no-cycle */
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { User } from './User'

@Entity()
export class UserUrl extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => User, (user) => user.userUrls )
  user: User
}
