/*eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BlockchainIdentity } from './BlockchainIdentity'
import { IsNotEmpty } from 'class-validator'
import { BaseEntity } from './BaseEntity'
import { Url } from 'url'

@Entity()
export class Blockchain extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @IsNotEmpty()
  @Column('text')
  public name: string

  @IsNotEmpty()
  @Column('text')
  public rpcEndpoint: Url

  @IsNotEmpty()
  @Column('smallint')
  public networkID: number

  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: ['ethereum', 'bitcoin']
  })
  public protocol: 'ethereum' | 'bitcoin'

  @OneToMany(
    type => BlockchainIdentity,
    blockchainIdentity => blockchainIdentity.blockchain
  )
  blockChainIdentities: BlockchainIdentity[]

  public toString(): string {
    return `${this.id} - ${this.name} (${this.protocol}) - ${this.networkID}`
  }
}
