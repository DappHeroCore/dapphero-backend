const DefaultNamingStrategy = require('./NamingStrategy').default

module.exports = {
  type: 'postgres',
  host: 'localhost',
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
