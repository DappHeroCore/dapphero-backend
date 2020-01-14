/*eslint-disable import/no-cycle */
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne } from 'typeorm'
import { Blockchain } from './Blockchain'
import { BaseEntity } from './BaseEntity'
import { User } from './User'

@Entity()
export class Wallet extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  publicKey: string

  @ManyToOne((type) => Blockchain)
  blockchain: Blockchain

  @ManyToOne((type) => User, (user) => user.wallets)
  user: User
}
