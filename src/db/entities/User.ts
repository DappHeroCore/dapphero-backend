/* eslint-disable import/no-cycle */
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'
import { Account } from './Account'
import { BaseEntity } from './BaseEntity'
import { Wallet } from './Wallet'
import { UserUrl } from './UserUrl'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  firstName: string

  @Column('text')
  lastName: string

  @Column('text')
  email: string

  @ManyToOne((type) => Account, (account) => account.users)
  account: Account

  @OneToMany((type) => Wallet, (wallet) => wallet.user)
  wallets: Wallet[]

  @OneToMany((type) => UserUrl, (userUrl) => userUrl.user)
  userUrls: UserUrl[]

  @Column({
    type: 'enum',
    enum: [ 'google', 'github' ]
  })
  authType: 'google' | 'github'
}
