/*eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Account } from './Account';

@Entity()
export class AccountSubscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'text' })
  name: string

  @ManyToOne(
    type => Account,
    account => account.subscriptions
  )
  account: number[]

  public toString(): string {
    return `${this.id} - ${this.name}`
  }
}
