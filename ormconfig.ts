const DefaultNamingStrategy = require("./src/db/NamingStrategy").default
import * as dotenv from "dotenv"

dotenv.config()

const config = {
  type: process.env.TORM_CONNECTION,
  host: process.env.TORM_HOST,
  port: process.env.TORM_PORT,
  username: process.env.TORM_USERNAME,
  password: process.env.TORM_PASSWORD,
  database: process.env.TORM_DATABASE,
  synchronize: process.env.TORM_SYNCHRONIZE,
  logging: "all",
  logger: "simple-console",
  namingStrategy: new DefaultNamingStrategy(),
  entities: ["src/db/entities/*.ts"],
  migrations: ["src/db/migrations/*.ts"],
  cli: {
    migrationsDir: "src/db/migrations"
  }
}

export = config
