import { EntityRepository, Repository } from 'typeorm';
import { EthContractInstance } from '../entities/EthContractInstance';

@EntityRepository(EthContractInstance)
export class EthContractRepository extends Repository<EthContractInstance>  {

}