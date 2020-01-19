import { EntityRepository, Repository } from "typeorm"
import { User } from "../entities/User"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAndSave(
    firstName: string,
    lastName: string,
    email: string,
    account: string,
    authType: "google" | "github"
  ) {
    const user = await this.manager.create(User, {
      firstName,
      lastName,
      email,
      account,
      authType,
    })
    return this.manager.save(user)
  }

  async findByName(firstName: string, lastName: string) {
    return this.manager
      .createQueryBuilder(User, "user")
      .where("user.firstName = :firstName AND user.lastName = :lastName")
      .setParameters({ firstName, lastName })
      .getOne()
  }
}
