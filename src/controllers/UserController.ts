import {
  JsonController,
  Get,
  Post as HttpPost,
  Param,
  Delete,
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

  @Get("/users")
  all() {
    return this.userService.find()
  }

  @Post("/users")
  async post(
    @Req() request: Request,
    @Res() response: Response,
    @Body() user: User
  ) {
    console.log("user: ", user)
    return this.userService.create(user)
  }

  @Get("/users/:id")
  async one(@Param("id") id: number) {
    console.log(
      "this.accountService.findOne(id): ",
      await this.userService.findOne(id)
    )
    return await this.userService.findOne(id)
  }

  /*     @Delete("/posts/:id")
    delete(@Param("id") id: number): Account {
        return this.accountService.remove(id);
    } */
}
