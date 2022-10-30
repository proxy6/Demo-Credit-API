import knex from "knex";
import dbConfig from "../knexfile";
import { Model } from "objection";
const env = `${process.env.NODE_ENV}` 
const knexDB = knex(dbConfig[env])

export default async () => {
  try {
     await knexDB.raw('SELECT 1');
     Model.knex(knexDB);
     console.log('database connected successfully');
     return knexDB;
  } catch (error) {
    console.log(error);
    process.exit(0)
  }
}
