import { EntityRepository, Repository } from "typeorm"
import { Blockchain } from "../entities/Blockchain"

@EntityRepository(Blockchain)
export class BlockchainRepository extends Repository<Blockchain> {}
