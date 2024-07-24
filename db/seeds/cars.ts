import { Knex } from "knex";
import axios from "axios";

interface Car {
    id: string;
    plate: string;
    manufacture: string;
    model: string;
    image: string;
    rentPerDay?: number;
    capacity: number;
    description: string;
    availableAt?: string;
    transmission: string;
    available: boolean;
    type: string;
    year: number;
    options: string[];
    price?: number;
    rent_per_day?: number; // Optional, as this will be added later
    available_at?: string; // Optional, as this will be added later
    driver_type?: number; // Optional, as this will be added later
}

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // 1 = small
    // 2 = medium
    // 3 = large

    // Inserts seed entries
    const response = await axios.get("https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json");
    let cars: Car[] = response.data;

    cars = cars.map(car => {
        const { rentPerDay, availableAt, image, ...rest } = car;
        return {
            ...rest,
            image: image.replace(/^\./, ''),
            rent_per_day: rentPerDay,
            available_at: availableAt,
            driver_type: Math.floor(Math.random() * 2),
        };
    });

    await knex("cars").insert(cars);
};
