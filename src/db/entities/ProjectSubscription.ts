import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Project } from './Project'

@Entity()
export class ProjectSubscription extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => Project, (project) => project.subscriptions)
  projectId: number[]

  @Column({
    type: 'enum',
    enum: [ 'admin', 'editor', 'ghost' ],
    default: 'ghost'
  })
role: 'admin' | 'editor' | 'ghost'
}
