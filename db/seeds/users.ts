import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // 1 = small
    // 2 = medium
    // 3 = large

    // Inserts seed entries
    await knex("users").insert([
        {
            nama: "Super Admin",
            email: "superadmin@gmail.com",
            password: "$2y$10$hbG7hbJTo1BqkI7mELJQfONPsiTY/1JZmtsTs4nJSTKztJXBB6b9u",
            role: "superadmin",
            avatar: "https://placehold.co/600x400.png",
            created_by: 1,
            updated_by: 1,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            nama: "Admin",
            email: "admin@gmail.com",
            password: "$2y$10$rgE2gxQaxHq2rH7Wpzi44ejGUI9uu9fGpVKhqstnJLdZUQycap9fC",
            role: "admin",
            avatar: "https://placehold.co/600x400.png",
            created_by: 1,
            updated_by: 1,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            nama: "User",
            email: "user@gmail.com",
            password: "$2y$10$UkNdQjpxlAkZVFrwQZpXq.Z7CAA53fUKuBLhuVe7TZAN0Kb.AO3rG",
            role: "user",
            avatar: "https://placehold.co/600x400.png",
            created_by: null,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },

    ]);
};
