import { Service } from "typedi"

import { getCustomRepository } from "typeorm"
import { ProjectRepository } from "../db/repositories/ProjectRepository"
import { Project } from "../db/entities/Project"
import { User } from "../db/entities/User"
import { Account } from "../db/entities/Account"

@Service()
export class ProjectService {
  private projectRepository: ProjectRepository

  constructor() // Inside constructor
  //@OrmRepository() private projectRepository: ProjectRepository,
  //@Logger(__filename) private log: LoggerInterface)
  {
    this.projectRepository = getCustomRepository(ProjectRepository)
  }

  public find(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ["owner", "account"]
    })
  }

  public findOne(id: number): Promise<Project | undefined> {
    return this.projectRepository.findOne(id, {
      relations: ["owner", "account"]
    })
  }

  public getProjectConfig(url: string, secret: string): Promise<Project | undefined> {
    return this.projectRepository.findOne(
      { url, secret },
      {
        relations: ["ethContractInstances"]
      }
    )
  }

  public async create(
    project: Project,
    user: User,
    account: Account
  ): Promise<Project> {
    project.owner = user
    project.account = account
    project.admins = [user]
    project.users = [user]
    return await this.projectRepository.save(project)
  }

  public async update(project: Project) {
    return await this.projectRepository.save(project)
  }
}
