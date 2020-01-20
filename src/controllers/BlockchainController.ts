import {
  JsonController,
  Post,
  Body
} from "routing-controllers"
import { Service } from "typedi"
import { BlockchainService } from "../services/BlockchainService";
import { Blockchain } from "../db/entities/Blockchain";

@Service()
@JsonController()
export class BlockchainController {
  private blockchainService: BlockchainService

  constructor() {
    this.blockchainService = new BlockchainService()
  }

  // TODO: Check for user's permissions
  @Post("/blockchains")
  async post(
    @Body() blockchain: Blockchain
  ) {
    return this.blockchainService.create(blockchain)
  }
}
