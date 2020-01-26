import {
  JsonController,
  Get,
  Post,
  Param,
  Body,
  BodyParam,
  Req,
  Res
} from "routing-controllers"
import { Service } from "typedi"
import { Project } from "../db/entities/Project"
import { ProjectService } from "../services/ProjectService"
import { UserService } from "../services/UserService"
import { AccountService } from "../services/AccountService"
import { UserNotFoundError } from "./errors/UserNotFoundError"
import { AccountNotFoundError } from "./errors/AccountNotFoundError"
import { Request } from "express"

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

  @Get("/api/projects")
  all() {
    return this.projectService.find()
  }

  @Post("/api/projects")
  async post(
    @Body() project: Project,
    @BodyParam("userId", { required: true }) userId: number,
    @BodyParam("accountId", { required: true }) accountId: number
  ) {
    // TODO: this user should be user detected via Middleware
    const user = await this.userService.findOne(userId)
    if (!user) {
      throw new UserNotFoundError()
    }
    const account = await this.accountService.findOne(accountId)
    if (!account) {
      throw new AccountNotFoundError()
    }
    return this.projectService.create(project, user, account)
  }

  @Get("/api/projects/getconfig")
  async getProjectConfig(
    @Req() request: Request,
    @BodyParam("secret", { required: true }) secret: string
  ) {
    return await this.projectService.getProjectConfig(request.host, secret)
  }

  @Get("/api/projects/:id")
  async one(@Param("id") id: number) {
    return await this.projectService.findOne(id)
  }
}
