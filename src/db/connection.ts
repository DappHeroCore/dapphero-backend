import { createConnection, Connection } from 'typeorm'

export const connection: Promise<Connection> = createConnection()
