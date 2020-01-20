import { Service } from "typedi"

import { Account } from "../db/entities/Account"
import { AccountRepository } from "../db/repositories/AccountRepository"
import { getCustomRepository } from "typeorm"
import { User } from "/db/entities/User"
import { HttpError } from "routing-controllers"

@Service()
export class AccountService {
  private accountRepository: AccountRepository

  constructor() // Inside constructor
  //@OrmRepository() private taskRepository: TaskRepository,
  //@Logger(__filename) private log: LoggerInterface)
  {
    this.accountRepository = getCustomRepository(AccountRepository)
  }

  public find(): Promise<Account[]> {
    return this.accountRepository.find() // { relations: ['photos'] }
  }

  public findOne(id: number): Promise<Account | undefined> {
    return this.accountRepository.findOne({ id })
  }

  public findByUserId(userId: string): Promise<Account[]> {
    return this.accountRepository.find({
      where: { userId }
    })
  }

  public async create(newAccount: Account, user: User): Promise<Account> {
    newAccount.owner = user
    return await this.accountRepository.save(newAccount)
  }

  public async update(
    accountId: number,
    userId: number,
    account: Account
  ): Promise<Account> {
    const objAccount = await this.accountRepository.findOne(accountId)
    if (!(objAccount.owner.id === userId)) {
      throw new HttpError(
        403,
        "User does not have permissions to update this Account"
      )
    }

    account.name = name
    return this.accountRepository.save(account)
  }
}
