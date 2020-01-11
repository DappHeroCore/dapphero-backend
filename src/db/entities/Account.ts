import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Project } from './Project'

@Entity()
export class Account extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: [ 'admin', 'editor', 'ghost' ],
    default: 'ghost'
  })
role: 'admin' | 'editor' | 'ghost'
}
