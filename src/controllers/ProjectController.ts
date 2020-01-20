import {
  JsonController,
  Get,
  Post,
  Param,
  Body,
  Req,
  Res,
  HttpError,
  BodyParam
} from "routing-controllers"
import { Service } from "typedi"
import { Project } from "../db/entities/Project"
import { ProjectService } from "../services/ProjectService"
import { UserService } from "../services/UserService"
import { AccountService } from "../services/AccountService"
import { EthContractInstance } from "/db/entities/EthContractInstance"

@Service()
@JsonController()
export class ProjectController {
  private projectService: ProjectService
  private userService: UserService
  private accountService: AccountService

  constructor() {
    this.projectService = new ProjectService()
    this.userService = new UserService()
    this.accountService = new AccountService()
  }

  @Get("/projects")
  all() {
    return this.projectService.find()
  }

  @Post("/projects")
  async post(
    @Body() project: Project,
    @BodyParam("userId", { required: true }) userId: number,
    @BodyParam("accountId", { required: true }) accountId: number
  ) {
    // TODO: this user should be user detected via Middleware
    const user = await this.userService.findOne(userId)
    if (!user) {
      throw new HttpError(404, "User not found!")
    }
    const account = await this.accountService.findOne(accountId)
    if (!account) {
      throw new HttpError(404, "Account not found!")
    }
    return this.projectService.create(project, user, account)
  }

  @Get("/projects/:id")
  async one(@Param("id") id: number) {
    return await this.projectService.findOne(id)
  }
}
