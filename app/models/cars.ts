import { Model, ModelObject} from "objection";

export class CarsModel extends Model {
    id!: string;
    available!: boolean;
    driver_type!: boolean;
    plate!: string;
    manufacture!: string;
    model!: string;
    image!: string;
    rent_per_day!: number;
    capacity!: number;
    transmission!: string;
    type!: string;
    year!: string;
    options!: string[];
    specs!: string[];
    description!: string;
    available_at!: Date;
    created_by!: number;
    updated_by!: number;
    created_at!: Date;
    updated_at!: Date;
    
    static tableName = 'cars';
}

export type Cars = ModelObject<CarsModel>;
export type CreateCarInput = Omit<Cars, 'created_at' | 'updated_at'>;
export type DeleteCarInput = Pick<Cars, 'available' | 'updated_by'>