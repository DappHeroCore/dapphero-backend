import {
  JsonController,
  Post,
  Param,
  Body,
  BodyParam,
  Get,
  NotFoundError
} from "routing-controllers"
import { Service } from "typedi"
import { UserService } from "../services/UserService"
import { EthContractInstance } from "../db/entities/EthContractInstance"
import { EthContractService } from "../services/EthContractService"
import { DbError } from "./errors/DbError";
import { UserNotFoundError } from "./errors/UserNotFoundError";

@Service()
@JsonController()
export class EthContractController {
  private ethContractService: EthContractService
  private userService: UserService

  constructor() {
    this.ethContractService = new EthContractService()
    this.userService = new UserService()
  }

  @Get("/api/ethcontracts")
  all() {
    return this.ethContractService.find()
  }

  @Get("/api/ethcontracts/:id")
  async one(@Param("id") id: number) {
    const contract = await this.ethContractService.findOne(id)
    if (!contract) throw new NotFoundError(`Contract was not found.`)
    return contract
  }

  @Post("/api/projects/:id/ethcontracts")
  async post(
    @Body() contract: EthContractInstance,
    @BodyParam("userId", { required: true }) userId: number // TODO: remove
  ) {
    // TODO: this user should be user detected via Middleware
    const user = await this.userService.findOne(userId)
    if (!user) {
      throw new UserNotFoundError()
    }
    // TODO: Check if user has the permissions to create a contract in this project
    let newContract
    try {
      newContract = await this.ethContractService.create(contract)
    } catch (e) {
      throw new DbError(e)
    }
    return newContract
  }
}
