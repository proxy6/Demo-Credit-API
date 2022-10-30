import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_accounts', table => {
        table.increments('id').primary()
        table.string("account_number", 255).notNullable();
        table.string("user_id", 255).notNullable();
        table.float('current_balance', 255).unique()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
})
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user_accounts');
}

