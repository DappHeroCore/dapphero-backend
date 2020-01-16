import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { BaseEntity } from './BaseEntity'
import { User } from './User'
import { Blockchain } from './Blockchain'

@Entity()
export class BlockchainIdentity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  public user: User

  @ManyToOne(type => Blockchain)
  @JoinColumn({ name: 'blockchain_id' })
  public blockchain: Blockchain

  @IsNotEmpty()
  @Column({ name: 'public_key' })
  public publicKey: string

  public toString(): string {
    return `${this.id} - ${this.user.firstName} ${this.user.lastName} - ${this.publicKey}`
  }
}
