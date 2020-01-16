import * as express from "express"
import { Account } from "../db/entities/Account"
import { getManager } from "typeorm"
import { validate } from "class-validator"

class AccountController {
  private path = "/accounts"
  public router: express.Router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll)
    this.router.get(this.path + "/:id", this.getOne)
    this.router.post(this.path, this.create)
    this.router.put(this.path + "/:id", this.update)
    this.router.delete(this.path + "/:id", this.delete)
  }

  public async getAll(req: express.Request, res: express.Response) {
    const accountManager = getManager().getRepository(Account)
    const accounts = await accountManager.find()
    return res.send(accounts)
  }

  public async getOne(req: express.Request, res: express.Response) {
    const accountManager = getManager().getRepository(Account)
    const account = await accountManager.findOne(req.params.id)
    return res.send(account)
  }

  public async create(req: express.Request, res: express.Response) {
    //Get parameters from the body
    let { name } = req.body
    //TODO: we should be getting the user from the JWT Middleware

    let account: Account = new Account()
    account.name = name
    //TODO: account.owner = user

    //Validate that Account parameters are ok
    const errors = await validate(account)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    //Try to save or fail
    const accountRepository = getManager().getRepository(Account)
    try {
      await accountRepository.save(account)
    } catch (e) {
      res.status(409).send(`Account couldn't be created: ${e}`)
      return
    }

    //It's all ok, send 201 response
    return res.status(201).send(account)
  }

  public async update(req: express.Request, res: express.Response) {
    const accountManager = getManager().getRepository(Account)
    const account = await accountManager.findOne(req.params.id)
    if (account !== undefined) {
      await accountManager.update(req.params.id, req.body)
      return res.status(200).send({ message: "Account updated correctly" })
    }

    return res.status(404).send({ message: "Account not found" })
  }

  public async delete(req: express.Request, res: express.Response) {
    const accountManager = getManager().getRepository(Account)
    accountManager.delete(req.params.id)
    return res.status(200).send({ message: "Account deleted successfully" })
  }
}

export default AccountController
