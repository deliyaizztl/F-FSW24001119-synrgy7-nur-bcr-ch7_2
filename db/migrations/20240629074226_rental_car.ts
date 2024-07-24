import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('rental_car', (table: Knex.TableBuilder) => {
        table.string('name', 255).notNullable();
        table.integer('price').notNullable();
        table.text('photo').notNullable();
        table.integer('category').notNullable();
        table.datetime('start_rent').notNullable();
        table.datetime('finish_rent').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('rental_car');
}

