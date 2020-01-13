import { createConnection, Connection } from 'typeorm'

export const connection: Promise<Connection> = createConnection({
  type: 'postgresl',
  host: 'aaykk7c7p8g0cw.cx5grrtqaau8.us-east-2.rds.amazonaws.com',
  port: 3306,
  username: 'rootroot',
  password: 'rootroot',
  database: 'ebdb'
})
