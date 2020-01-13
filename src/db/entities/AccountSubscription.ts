import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Account } from './Account'

@Entity()
export class AccountSubscription extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => Account, (account) => account.subscriptions)
  accountID: number[]

  @Column({
    type: 'enum',
    enum: [ 'admin', 'editor', 'ghost' ],
    default: 'ghost'
  })
role: 'admin' | 'editor' | 'ghost'
}
