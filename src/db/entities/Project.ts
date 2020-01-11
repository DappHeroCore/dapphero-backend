import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, OneToMany } from 'typeorm'
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

  @Column()
  owner: string

  @OneToMany(type => User, user => user.project)
  admins: User[]

  @ManyToOne(type => Account, accounts => )
  acount
  @Column({
    type: 'enum',
    enum: [ 'admin', 'editor', 'ghost' ],
    default: 'ghost'
  })
role: 'admin' | 'editor' | 'ghost'
}
