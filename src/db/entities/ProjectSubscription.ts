/*eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Project } from './Project'

@Entity()
export class ProjectSubscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'text', nullable: false })
  public name: string

  @ManyToOne(
    type => Project,
    project => project.subscriptions
  )
  public project: Project

  public toString(): string {
    return `${this.id} - ${this.name}`
  }
}
