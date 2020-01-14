/*eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { BaseEntity } from './BaseEntity'

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

}
