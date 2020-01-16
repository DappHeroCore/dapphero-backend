/*eslint-disable import/no-cycle */
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Account } from './Account'
import { BaseEntity } from './BaseEntity'
import { EthContractInstance } from './EthContractInstance'
import { Feature } from './Feature'
import { User } from './User'
import { ProjectSubscription } from './ProjectSubscription'

@Entity()
export class Project extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  url: string

  @Column('text')
  name: string

  @Column('text')
  screenShotUri: string

  @ManyToMany(() => User, (user) => user.projects)
  users: User

  @ManyToMany(() => User)
  admins: User[]

  @OneToOne(() => User)
  owner: User

  @ManyToOne((type) => Account, (account) => account.projects)
  account: Account

  @OneToMany((type) => ProjectSubscription, (projectSubscription) => projectSubscription.project)
  subscriptions: ProjectSubscription

  @OneToMany((type) => EthContractInstance, (ethContractInstance) => ethContractInstance.project)
  ethContractInstances: EthContractInstance[]

  @ManyToMany((type) => Feature)
  features: Feature[]
}
