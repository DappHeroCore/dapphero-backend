import {
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  AfterInsert,
  BeforeUpdate,
  AfterUpdate,
  BeforeRemove,
  AfterRemove
} from "typeorm"

export class BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @VersionColumn({ name: 'entity_version' })
  entityVersion: number

  @AfterInsert()
  afterInsertion() {
    console.log(
      `event: "${this.toString()}" has been inserted and callback executed`
    )
  }

  @BeforeUpdate()
  beforeUpdate() {
    console.log(`event: "${this.toString()}" will be updated so soon...`)
  }

  @AfterUpdate()
  afterUpdate() {
    console.log(
      `event: "${this.toString()}" has been updated and callback executed`
    )
  }

  @BeforeRemove()
  beforeRemove() {
    console.log(`event: "${this.toString()}" will be removed`)
  }

  @AfterRemove()
  afterRemove() {
    console.log(
      `event: "${this.toString()}" has been removed and callback executed`
    )
  }
}
