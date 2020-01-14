/*eslint-disable import/no-cycle */
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, VersionColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Blockchain } from './Blockchain'
import { Project } from './Project'

@Entity()
export class EthContractInstance extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  address: string

  @Column('boolean')
  isLive: boolean

  @ManyToOne((type) => Blockchain)
  blockchain: Blockchain

  @ManyToMany((type) => Project, (project) => project.ethContractInstances)
  projects: Project[]
}
