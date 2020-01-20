/*eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { BaseEntity } from './BaseEntity'
import { Blockchain } from './Blockchain'
import { Project } from './Project'

@Entity()
export class EthContractInstance extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @IsNotEmpty()
  @Column({ name: 'address' })
  public address: string

  @Column({ type: 'boolean', name: 'is_live', nullable: true })
  public isLive: boolean

  @ManyToOne(type => Blockchain)
  @JoinColumn({ name: 'blockchain_id' })
  public blockchain: Blockchain

  @IsNotEmpty()
  @ManyToOne(type => Project, project => project.ethContractInstances)
  @JoinColumn({ name: 'project_id' })
  public project: Project

  @Column('jsonb')
  abi: any[] & { [key: string]: any }

  public toString(): string {
    return `${this.id} - ${this.address}`
  }
}
