import { EntityRepository, Repository } from "typeorm"
import { Account } from "../entities/Account"

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  
  async findByName(name: string) {
    return this.manager
      .createQueryBuilder(Account, "account")
      .where("account.name = :name")
      .setParameters({ name })
      .getOne()
  }
}
