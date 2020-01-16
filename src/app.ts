import * as express from "express"
import { createConnection, Connection } from "typeorm"
import bodyParser = require("body-parser");

class App {
  public app: express.Application
  public port: number
  public connection: Connection

  constructor(controllers: any[], port: number) {
    this.app = express()
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    this.app.use(bodyParser.json())
    this.port = port
    this.initializeDatabase()
    this.initializeControllers(controllers)
  }

  private async initializeDatabase() {
    const connection = await createConnection()
    if (connection === undefined) {
      throw new Error("Error connecting to database")
    } 
    connection.synchronize() // Updates database schema to match the models' definitions
    this.connection = connection
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach(controller => {
      this.app.use("/", controller.router)
    })
  }
  
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Power Server listening on port ${this.port}!`)
    })
  }
}

export default App
