import { Service } from "typedi"

import { getCustomRepository } from "typeorm"
import { EthContractRepository } from "../db/repositories/EthContractRepository"
import { EthContractInstance } from "../db/entities/EthContractInstance"

@Service()
export class EthContractService {
  private ethContractRepository: EthContractRepository

  constructor() // Inside constructor
  //@OrmRepository() private projectRepository: ProjectRepository,
  //@Logger(__filename) private log: LoggerInterface)
  {
    this.ethContractRepository = getCustomRepository(EthContractRepository)
  }

  public find(): Promise<EthContractInstance[]> {
    return this.ethContractRepository.find({
      relations: ["blockchain", "project"]
    })
  }

  public findOne(id: number): Promise<EthContractInstance | undefined> {
    return this.ethContractRepository.findOne(id)
  }

  public async create(
    contract: EthContractInstance
  ): Promise<EthContractInstance> {
    return await this.ethContractRepository.save(contract)
  }

  public async update(contract: EthContractInstance) {
    return await this.ethContractRepository.save(contract)
  }
}
