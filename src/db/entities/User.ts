import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany
} from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { IsNotEmpty, IsEmail } from "class-validator"
import { Account } from "./Account"
import { Project } from "./Project"
import { BlockchainIdentity } from "./BlockchainIdentity"

@Entity({
  orderBy: {
    id: "DESC"
  }
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @IsNotEmpty()
  @Column({ type: "text", name: "first_name" })
  public firstName: string

  @IsNotEmpty()
  @Column({ type: "text", name: "last_name" })
  public lastName: string

  @IsEmail()
  @Column({ type: "text" })
  public email: string

  @ManyToOne(
    type => Account,
    account => account.users
  )
  public account: Account

  @ManyToMany(
    type => Project,
    project => project.users
  )
  public projects: Project[]

  @OneToMany(
    type => BlockchainIdentity,
    blockchainIdentity => blockchainIdentity.user
  )
  public blockchainIdentities: BlockchainIdentity[]

  @Column({
    type: "enum",
    enum: ["google", "github"]
  })
  public authType: "google" | "github"

  public toString(): string {
    return `${this.firstName} ${this.lastName} (${this.email})`
  }
}
