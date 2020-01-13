import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Account } from './Account'
import { User } from './User'

@Entity()
export class Project extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @Column()
  name: string

  @OneToOne(() => User, user => user)
  owner: string

  @ManyToOne((type) => Account, (accounts) => accounts.projects)
  acountId: number

  @Column()
  screenShotUri: string

  @Column({
    type: 'enum',
    enum: [ 'admin', 'editor', 'ghost' ],
    default: 'ghost'
  })
role: 'admin' | 'editor' | 'ghost'
}
