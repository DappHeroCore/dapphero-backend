import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Project } from './Project'
import { User } from './User'

@Entity()
export class UserUrl extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => User, (user) => user.UserUrls )
  userId: number

  @Column({
    type: 'enum',
    enum: [ 'admin', 'editor', 'ghost' ],
    default: 'ghost'
  })
  role: 'admin' | 'editor' | 'ghost'
}
