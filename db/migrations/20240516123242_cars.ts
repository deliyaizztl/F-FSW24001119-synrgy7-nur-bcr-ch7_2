import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.boolean('available').defaultTo(true);
        table.boolean('driver_type').notNullable();
        table.string('plate').notNullable();
        table.string('manufacture').notNullable();
        table.string('model').notNullable();
        table.string('image').notNullable();
        table.integer('rent_per_day').notNullable();
        table.integer('capacity').notNullable();
        table.string('transmission').notNullable();
        table.string('type').notNullable();
        table.string('year').notNullable();
        table.specificType('options', 'text ARRAY').notNullable();
        table.specificType('specs', 'text ARRAY').notNullable();
        table.string('description').notNullable();
        table.datetime('available_at').notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars');
}