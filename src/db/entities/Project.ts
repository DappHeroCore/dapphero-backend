/*eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { BaseEntity } from './BaseEntity'
import { Account } from './Account'
import { User } from './User'
import { EthContractInstance } from './EthContractInstance'
import { ProjectSubscription } from './ProjectSubscription'
import { Feature } from './Feature'

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'text', nullable: true })
  public url: string

  @IsNotEmpty()
  @Column({ type: 'text', nullable: false })
  public name: string

  @Column({ type: 'text', nullable: true })
  public screenShotUri: string

  @ManyToMany(
    type => User,
    user => user.projects
  )
  @JoinTable()
  public users: User[]

  @ManyToMany(type => User)
  @JoinTable()
  public admins: User[]

  @ManyToOne(type => Account)
  @Column({ name: 'account_id' })
  public accountId: number

  @ManyToOne(type => User, user => user.projects)
  public owner: User

  @ManyToOne(
    type => Account,
    account => account.projects
  )
  public account: Account

  @OneToMany(
    type => ProjectSubscription,
    projectSubscription => projectSubscription.project
  )
  public subscriptions: ProjectSubscription

  @OneToMany(
    type => EthContractInstance,
    ethContractInstance => ethContractInstance.project
  )
  public ethContractInstances: EthContractInstance[]

  @ManyToMany(type => Feature)
  @JoinTable()
  public features: Feature[]

  public toString(): string {
    return `${this.id} - ${this.name}`
  }
}
