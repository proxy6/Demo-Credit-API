/**
 * @type {Knex}
 */
import type { Knex } from "knex";
 import * as dotenv from 'dotenv'
 dotenv.config({ debug: true })
 console.log( process.env.DBNAME)
const dbConfig: { [key: string]: Knex.Config } = {
  production: {
    client: "mysql",
    connection: {
      database: process.env.DBNAME,
      user:     process.env.DBUSER,
      password: process.env.DBPASSWORD,
      port: 3306
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  
  development: {
    client: "mysql",
    connection: {
      database: process.env.DBNAME,
      user:     process.env.DBUSER,
      password: process.env.DBPASSWORD,
      host: process.env.HOST,
      port: 3306
    },
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  },

  test: {
    client: "mysql",
    connection: {
      database: process.env.DBNAME,
      user:     process.env.DBUSER,
      password: process.env.DBPASSWORD,

      port: 3306
      
    },  
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  },


 

};
export default dbConfig
