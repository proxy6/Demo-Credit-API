import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string("firstname", 255).notNullable();
        table.string("lastname", 255).notNullable();
        table.string('phone', 255).unique()
        table.string('password', 255).notNullable();
        table.string("trx_pin", 255).nullable();
        table.string("email", 255).nullable();
        table.string("trx_pin", 255).nullable();
        table.enum('role', ['user', 'admin']).notNullable;
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
})
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

