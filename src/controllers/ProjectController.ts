import * as express from "express"
import { Project } from "../db/entities/Project"
import { getManager } from "typeorm"
import { validate } from "class-validator";

class ProjectController {
  public path = "/projects"
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
    const projectManager = getManager().getRepository(Project)
    const projects = await projectManager.find()
    return res.send(projects)
  }

  public async getOne(req: express.Request, res: express.Response) {
    const projectManager = getManager().getRepository(Project)
    const project = await projectManager.findOne(req.params.id)
    return res.send(project)
  }

  public async create(req: express.Request, res: express.Response) {
     //Get parameters from the body
     let { url, name, screenShotUri, accountId } = req.body
     //TODO: we should be getting the user from the JWT Middleware
 
     let project: Project = new Project()
     project.url = url
     project.name = name
     project.screenShotUri = screenShotUri
     project.accountId = accountId

     //Validate that Project parameters are ok
     const errors = await validate(project)
     if (errors.length > 0) {
       res.status(400).send(errors)
       return
     }
 
     //Try to save or fail
     const projectRepository = getManager().getRepository(Project)
     try {
       await projectRepository.save(project)
     } catch (e) {
       res.status(409).send(`Project couldn't be created: ${e}`)
       return
     }
 
     //It's all ok, send 201 response
     return res.status(201).send(project)
  }

  public async update(req: express.Request, res: express.Response) {
    const projectManager = getManager().getRepository(Project)
    const project = await projectManager.findOne(req.params.id)
    if (project !== undefined) {
      await projectManager.update(req.params.id, req.body)
      return res.status(200).send({ message: "Project updated correctly" })
    }

    return res.status(404).send({ message: "Project not found" })
  }

  public async delete(req: express.Request, res: express.Response) {
    const projectManager = getManager().getRepository(Project)
    projectManager.delete(req.params.id)
    return res.status(200).send({ message: "Project deleted successfully" })
  }
}

export default ProjectController
