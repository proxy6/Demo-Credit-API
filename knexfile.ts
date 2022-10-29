/**
 * @type {Knex}
 */
import * as dotenv from 'dotenv'
dotenv.config({ debug: true })
export default {
  development: {
    client: 'mysql',
    connection: {
      database: process.env.DBNAME,
      user:     process.env.DBUSER,
      password: process.env.DBPASSWORD,
      port: process.env.DBPORT
    }
  },
  production: {
    client: 'mysql',
    connection: {
      database: process.env.DBNAME,
      user:     process.env.DBUSER,
      password: process.env.DBPASSWORD,
      port: process.env.DBPORT
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
