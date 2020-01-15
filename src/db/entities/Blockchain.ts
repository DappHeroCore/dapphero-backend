/*eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { BlockchainIdentity } from './BlockchainIdentityt'

@Entity()
export class Blockchain extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  rpcEndpoint: string

  @Column('smallint')
  networkId: string

  @Column({
    type: 'enum',
    enum: [ 'ethereum', 'bitcoin' ]
  })
  protocol: 'ethereum' | 'bitcoin'

  @OneToMany((type) => BlockchainIdentity, (blockchainIdentity) => blockchainIdentity.blockchain)
  blockChainIdentities: BlockchainIdentity[]
}
