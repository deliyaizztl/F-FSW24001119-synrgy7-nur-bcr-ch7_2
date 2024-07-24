import type { Knex } from "knex";
import { onUpdateTrigger } from "../helper/knex.helper";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
        table.increments("id").primary();
        table.string("nama", 255).notNullable();
        table.string("email", 255).notNullable();
        table.string("password", 255).notNullable();
        table.text("avatar");
        table.string("role", 255).notNullable().defaultTo('user');
        table.integer("created_by")
        table.integer("updated_by")
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("updated_at").defaultTo(knex.fn.now())
        table.boolean("active").defaultTo(true)
    }).then(() => {
        return knex.raw(onUpdateTrigger("users"))
    })  
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users")
}

