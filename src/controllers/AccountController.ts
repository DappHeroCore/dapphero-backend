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
import { AccountService } from "../services/AccountService"
import { User } from "../db/entities/User"
import { Account } from "../db/entities/Account"
import { Request, Response } from "express"
import { UserService } from "../services/UserService"

@Service()
@JsonController()
export class AccountController {
  private accountService: AccountService
  private userService: UserService

  constructor() {
    this.accountService = new AccountService()
    this.userService = new UserService()
  }

  @Get("/api/accounts")
  all() {
    return 'this worked'
    return this.accountService.find()
  }

  @Post("/api/accounts")
  async post(
    @Req() request: Request,
    @Res() response: Response,
    @Body() account: Account
  ) {
    const user: User = await this.userService.findOne(1)
    return this.accountService.create(account, user)
  }

  @Get("/api/accounts/:id")
  async one(@Param("id") id: number) {
    return await this.accountService.findOne(id)
  }
}
