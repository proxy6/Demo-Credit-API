import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions', table => {
        table.increments('id').primary()
        table.string("user_id", 255).nullable();
        table.string("sender", 255).nullable();
        table.string("receiver", 255).nullable();
        table.float('amount', 255).notNullable()
        table.string('trx_ref', 255).unique()
        table.enum('type', ['Credit', 'Debit']).notNullable;
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
})
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}

