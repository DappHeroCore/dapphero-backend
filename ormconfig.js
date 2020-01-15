const DefaultNamingStrategy = require('./NamingStrategy').default

module.exports = {
  type: 'postgres',
  host: 'aaykk7c7p8g0cw.cx5grrtqaau8.us-east-2.rds.amazonaws.com',
  port: 5432,
  username: 'rootroot',
  password: 'rootroot',
  database: 'ebdb',
  synchronize: true,
  logging: 'all',
  logger: 'simple-console',
  namingStrategy: new DefaultNamingStrategy(),
  entities: [ 'src/db/entities/*.ts' ],
  migrations: [ 'src/db/migrations/*.ts' ],
  cli: { migrationsDir: 'src/db/migrations' }
}
