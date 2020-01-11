import { createConnection, Connection } from 'typeorm'

export const connection: Promise<Connection> = createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test'
})
