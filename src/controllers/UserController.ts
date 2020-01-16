import * as express from "express"
import { User } from "../db/entities/User"
import { getManager } from "typeorm"
import { validate } from "class-validator";

class UserController {
  public path = "/users"
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
    const userManager = getManager().getRepository(User)
    const users = await userManager.find()
    return res.send(users)
  }

  public async getOne(req: express.Request, res: express.Response) {
    const userManager = getManager().getRepository(User)
    const user = await userManager.findOne(req.params.id)
    return res.send(user)
  }

  public async create(req: express.Request, res: express.Response) {
     //Get parameters from the body
     let { firstName, lastName, email, authType } = req.body
     //TODO: we should be getting the user from the JWT Middleware
 
     let user: User = new User()
     user.firstName = firstName
     user.lastName = lastName
     user.email = email
     user.authType = authType

     //Validate that User parameters are ok
     const errors = await validate(user)
     if (errors.length > 0) {
       res.status(400).send(errors)
       return
     }
 
     //Try to save or fail
     const userRepository = getManager().getRepository(User)
     try {
       await userRepository.save(user)
     } catch (e) {
       res.status(409).send(`User couldn't be created: ${e}`)
       return
     }
 
     //It's all ok, send 201 response
     return res.status(201).send(user)
  }

  public async update(req: express.Request, res: express.Response) {
    const userManager = getManager().getRepository(User)
    const user = await userManager.findOne(req.params.id)
    if (user !== undefined) {
      await userManager.update(req.params.id, req.body)
      return res.status(200).send({ message: "User updated correctly" })
    }

    return res.status(404).send({ message: "User not found" })
  }

  public async delete(req: express.Request, res: express.Response) {
    const userManager = getManager().getRepository(User)
    userManager.delete(req.params.id)
    return res.status(200).send({ message: "User deleted successfully" })
  }
}

export default UserController
