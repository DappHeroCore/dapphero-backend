import "reflect-metadata"
import { useExpressServer } from "routing-controllers"
import * as dotenv from "dotenv"
import { UserController } from "./controllers/UserController"
import { AccountController } from "./controllers/AccountController"
import { createConnection } from "typeorm"
import bodyParser = require("body-parser")
import express = require("express")
dotenv.config()

const controllers = [AccountController, UserController]
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