import {
  JsonController,
  Post,
  Body,
  Get,
  Param,
  NotFoundError
} from "routing-controllers"
import { Service } from "typedi"
import { BlockchainService } from "../services/BlockchainService"
import { Blockchain } from "../db/entities/Blockchain"
import { DbError } from "./errors/DbError"

@Service()
@JsonController()
export class BlockchainController {
  private blockchainService: BlockchainService

  constructor() {
    this.blockchainService = new BlockchainService()
  }

  @Get("/blockchains")
  async all() {
    return this.blockchainService.find()
  }

  @Get("/blockchains/:id")
  async one(@Param("id") id: number) {
    const blockchain = await this.blockchainService.findOne(id)
    if (!blockchain) throw new NotFoundError(`Blockchain was not found.`)
    return blockchain
  }

  // TODO: Check for user's permissions
  @Post("/blockchains")
  async post(@Body() blockchain: Blockchain) {
    let newBlockchain: Blockchain
    try {
      newBlockchain = await this.blockchainService.create(blockchain)
    } catch (e) {
      throw new DbError(e)
    }

    return newBlockchain
  }
}
