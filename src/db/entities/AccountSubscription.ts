/*eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Account } from './Account'
import { BaseEntity } from './BaseEntity'

@Entity()
export class AccountSubscription extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => Account, (account) => account.subscriptions)
  account: number[]

  @Column({
    type: 'enum',
    enum: [ 'admin', 'editor', 'ghost' ],
    default: 'ghost'
  })
role: 'admin' | 'editor' | 'ghost'
}
