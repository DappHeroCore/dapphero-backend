/*eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity()
export class EthContractDefinition extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('jsonb')
  abi: any

}
