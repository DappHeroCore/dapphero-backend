import {
  JsonController,
  Post,
  Param,
  Body,
  HttpError,
  BodyParam,
  Get
} from "routing-controllers"
import { Service } from "typedi"
import { ProjectService } from "../services/ProjectService"
import { UserService } from "../services/UserService"
import { EthContractInstance } from "../db/entities/EthContractInstance"
import { EthContractService } from "../services/EthContractService"

@Service()
@JsonController()
export class EthContractController {
  private ethContractService: EthContractService
  private userService: UserService

  constructor() {
    this.ethContractService = new EthContractService()
    this.userService = new UserService()
  }

  @Get("/ethcontracts")
  all() {
    return this.ethContractService.find()
  }

  @Post("/projects/:id/ethcontracts")
  async post(
    @Body() contract: EthContractInstance,
    @BodyParam("userId", { required: true }) userId: number // TODO: remove
  ) {
    // TODO: this user should be user detected via Middleware
    const user = await this.userService.findOne(userId)
    if (!user) {
      throw new HttpError(404, "User not found!")
    }
    // TODO: Check if user has the permissions to create a contract in this project
    return this.ethContractService.create(contract)
  }
}
