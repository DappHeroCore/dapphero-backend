/*eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { BaseEntity } from './BaseEntity'
import { User } from './User'
import { AccountSubscription } from './AccountSubscription'
import { Project } from './Project'

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @IsNotEmpty()
  @Column({ type: 'text' })
  public name: string

  @OneToMany(
    type => User,
    user => user.account
  )
  public users: User[]

  @OneToMany(
    type => AccountSubscription,
    subscription => subscription.account
  )
  public subscriptions: AccountSubscription[]

  @OneToMany(
    type => Project,
    project => project.account
  )
  public projects: Project[]

  @OneToOne(type => User)
  @JoinColumn()
  public owner: User

  public toString(): string {
    return `${this.id} - ${this.name}`
  }
}
