import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Account extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  subscriptions: any[]

  projects: any[]

  @Column({
    type: 'enum',
    enum: [ 'admin', 'editor', 'ghost' ],
    default: 'ghost'
  })
role: 'admin' | 'editor' | 'ghost'
}
