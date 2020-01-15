/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { AccountSubscription } from './AccountSubscription'
import { BaseEntity } from './BaseEntity'
import { Project } from './Project'
import { User } from './User'

@Entity()
export class Account extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @OneToMany((type) => User, (user) => user.account)
  users: AccountSubscription[]

  @OneToMany((type) => AccountSubscription, (subscription) => subscription.account)
  subscriptions: AccountSubscription[]

  @OneToMany((type) => Project, (project) => project.account)
  projects: Project[]

  @OneToOne((type) => User)
  @JoinColumn()
  owner: User
}
