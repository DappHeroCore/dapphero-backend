/*eslint-disable import/no-cycle */
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToMany, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Project } from './Project'

@Entity()
export class Feature extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @ManyToMany((type) => Project, (project) => project.features)
  projects: Project[]
}
