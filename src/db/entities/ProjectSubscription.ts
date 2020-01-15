/*eslint-disable import/no-cycle */
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Project } from './Project'
@Entity()
export class ProjectSubscription extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @ManyToOne((type) => Project, (project) => project.subscriptions)
  project: Project
}
