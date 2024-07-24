import { Express, Request, Response } from 'express';
import carService from '../../../services/carService';

const roleUser = 'user';

interface Condition {
    driver_type?: boolean,
    available_at?: any,
    capacity?: number,
    available?: boolean,
}

async function getCars(req: any, res: Response): Promise<Response> {
    const { driver, date, time, capacity } = req.query;
    console.log(req.query);

    let condition: Condition = {};
    const driverNumber = parseInt(driver, 10);
    if (driver && date && time) {
        if (driverNumber !== 0 && driverNumber !== 1) {
            console.log("data driver")
            return res.status(400).json({
                "error": true,
                "message": "Data driver tidak lengkap"
            })
        }

        console.log(time)

        const dateTime = new Date(date + "T" + time)
        if (isNaN(dateTime)) {
            return res.status(400).json({
                "error": true,
                "message": "Data date time tidak lengkap"
            })
        }
        dateTime.setHours(dateTime.getHours() + 7);
        console.log("datetime: ", dateTime.toISOString());
        condition = {
            driver_type: driver,
            available_at: dateTime,
        };
    }

    if (capacity) {
        condition.capacity = capacity;
    }

    const cars = await carService.findAll(condition);
    return res.status(200).json(cars);
}

async function getCarsById(req: any, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
        const car = await carService.findById(id);
        if (req.user?.role === roleUser && !car.available) {
            return res.status(404).json({ message: "Car not found" });
        }

        return res.status(200).json(car);
    } catch (e) {
        return res.status(404).json({ message: "Car not found" });
    }
}

async function addCar(req: any, res: Response): Promise<any> {
    const { plate, manufacture, model, capacity, description, transmission, type, year, options, driver_type, rent_per_day, available_at, specs } = req.body;

    // Check required fields
    if (!plate || !manufacture || !model || !capacity || !transmission || !type || !year) {
        return res.status(400).json({ message: "Data tidak lengkap" });
    }

    try {
        // Upload file and get URL
        const fileUpload = await carService.upload(req.file);

        // Generate UUID for car ID
        const id = require('uuid').v4();

        // Create car record in the database
        const cars = await carService.create({
            id,
            plate,
            manufacture,
            model,
            capacity,
            description,
            transmission,
            type,
            year,
            options: options, // Convert array to comma-separated string
            driver_type,
            rent_per_day,
            available_at,
            specs: specs, // Convert array to comma-separated string
            image: fileUpload.url,
            created_by: req.user?.id ?? 1,
            updated_by: req.user?.id ?? 1,
            available: true
        });

        // Return success response
        return res.status(201).json({
            message: "Data berhasil ditambahkan",
            data: cars
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Gagal menambahkan data" });
    }
}

async function updateCar(req: any, res: Response): Promise<any> {
    const { id } = req.params;
    console.log(id)

    // update

    try {
        let updateData = {
            ...req.body,
            updated_by: req.user?.id ?? 1,
        };

        if (req.file) {
            const fileUpload = await carService.upload(req.file);
            updateData.photo = fileUpload.url;
        }

        const cars = await carService.update(id, updateData);

        return res.status(200).json({
            message: "Data berhasil diupdate",
            data: cars[0]
        });
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Gagal mengupdate data" })
    }
}

async function deleteCar(req: any, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateData = {
        available: false,
        updated_by: req.user ? req.user.id : 0
    }

    await carService.delete(id, updateData);

    return res.status(200).json({
        'message': 'Data telah dihapus'
    });
}

export default {
    getCars,
    getCarsById,
    addCar,
    updateCar,
    deleteCar
}