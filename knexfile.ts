import * as dotenv from 'dotenv'
dotenv.config({ debug: true })

export default {
  development: {
    client: 'mysql',
    connection: {
      filename: './db/init.sql'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DBNAME,
      user:     process.env.DBUSER,
      password: process.env.DBPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
