import { Service } from "typedi"

import { getCustomRepository } from "typeorm"
import { BlockchainRepository } from "../db/repositories/BlockchainRepository";
import { Blockchain } from "../db/entities/Blockchain";

@Service()
export class BlockchainService {
  private blockchainRepository: BlockchainRepository

  constructor() // Inside constructor
  //@OrmRepository() private projectRepository: ProjectRepository,
  //@Logger(__filename) private log: LoggerInterface)
  {
    this.blockchainRepository = getCustomRepository(BlockchainRepository)
  }

  public find(): Promise<Blockchain[]> {
    return this.blockchainRepository.find()
  }

  public findOne(id: number): Promise<Blockchain | undefined> {
    return this.blockchainRepository.findOne(id)
  }

  public async create(blockchain: Blockchain): Promise<Blockchain> {
    return await this.blockchainRepository.save(blockchain)
  }

  public async update(blockchain: Blockchain) {
    return await this.blockchainRepository.save(blockchain)
  }
}
