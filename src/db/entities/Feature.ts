/*eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Project } from './Project'

@Entity()
export class Feature extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column('text')
  public name: string

  @ManyToMany(
    type => Project,
    project => project.features
  )
  public projects: Project[]
}
