import { Service } from "typedi"

import { getCustomRepository } from "typeorm"
import { User } from "../db/entities/User"
import { UserRepository } from "../db/repositories/UserRepository";

@Service()
export class UserService {
  private userRepository: UserRepository

  constructor() // Inside constructor
  //@OrmRepository() private userRepository: UserRepository,
  //@Logger(__filename) private log: LoggerInterface)
  {
    this.userRepository = getCustomRepository(UserRepository)
  }

  public find(): Promise<User[]> {
    return this.userRepository.find()
  }

  public findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ id })
  }

  public findByUserId(userId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { userId }
    })
  }

  public async create(newUser: User): Promise<User> {
    return await this.userRepository.save(newUser)
  }

  public async update(): Promise<User> {
    return new User()
  }
}
