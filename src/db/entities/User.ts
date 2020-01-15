/* eslint-disable import/no-cycle */
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany } from 'typeorm'
import { Account } from './Account'
import { BaseEntity } from './BaseEntity'
import { BlockchainIdentity } from './BlockchainIdentityt'
import { Project } from './Project'

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

  @ManyToMany((type) => Project, (project) => project.users)
  projects: Project[]

  @OneToMany((type) => BlockchainIdentity, (blockchainIdentity) => blockchainIdentity.user)
  blockchainIdentities: BlockchainIdentity[]

  @Column({
    type: 'enum',
    enum: [ 'google', 'github' ]
  })
  authType: 'google' | 'github'
}
