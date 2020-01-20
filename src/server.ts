import * as dotenv from "dotenv"
import "reflect-metadata"
import { useExpressServer } from "routing-controllers"
import { createConnection } from "typeorm"
import { AccountController } from "./controllers/AccountController"
import { BlockchainController } from "./controllers/BlockchainController"
import { EthContractController } from "./controllers/EthContractController"
import { ProjectController } from "./controllers/ProjectController"
import { UserController } from "./controllers/UserController"
import bodyParser = require("body-parser")
import express = require("express")

dotenv.config()

const controllers = [
  ProjectController,
  AccountController,
  UserController,
  EthContractController,
  BlockchainController
]
const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

createConnection()
  .then(async connection => {
    useExpressServer(server, {
      controllers: controllers
    }).listen(5001)
    console.log("Server is up and running on port 5001.")
  })
  .catch(error => console.log("Error: ", error))
