import {
  JsonController,
  Get,
  Post as HttpPost,
  Param,
  Body,
  Post,
  Req,
  Res
} from "routing-controllers"
import { Service } from "typedi"
import { User } from "../db/entities/User"
import { Request, Response } from "express"
import { UserService } from "../services/UserService"

@Service()
@JsonController()
export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  @Get("/api/users")
  all() {
    return this.userService.find()
  }

  @Post("/api/users")
  async post(
    @Req() request: Request,
    @Res() response: Response,
    @Body() user: User
  ) {
    return this.userService.create(user)
  }

  @Get("/api/users/:id")
  async one(@Param("id") id: number) {
    return await this.userService.findOne(id)
  }
}
