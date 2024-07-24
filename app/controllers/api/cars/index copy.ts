import { Express, Request, Response} from 'express';
import carService from '../../../services/carService';

const roleUser = 'user';

interface Car {
    name: string;
    price: number;
    photo: string;
    category: number;
    start_rent: Date;
    finish_rent: Date;
    created_at: Date;
    updated_at: Date;
}

async function getCars(req: any, res: Response): Promise<Response> {
    let condition = {};
    if(req.user.role === roleUser) {
        condition = { active: true }
    }

    const cars = await carService.findAll(condition);
    return res.status(200).json(cars);
}

async function getCarsById(req: any, res: Response): Promise<Response> {
    const { id } = req.params;
    try{
        const car = await carService.findById(id);
        if(req.user.role === roleUser && !car.active) {
            return res.status(404).json({ message: "Car not found" });
        }

        return res.status(200).json(car);
    } catch (e) {
        return res.status(404).json({ message: "Car not found" });
    }
}

async function addCar(req: any, res: Response): Promise<any> {
    const { name, price, category, start_rent, finish_rent } = req.body;
    if(!name || !price || !category || !start_rent || !finish_rent || !req.file) {
        return res.status(400).json({ message: "Data tidak lengkap" });
    }
    
    try{
        const fileUpload = await carService.upload(req.file);
        const cars = await carService.create({
            name,
            price,
            category,
            start_rent,
            finish_rent,
            photo: fileUpload.url,
            created_by: req.user.id,
            updated_by: req.user.id,
            active: true
        });

        return res.status(201).json({
            message: "Data berhasil ditambahkan",
            data: cars
        });
    } catch(e){
        console.error(e)
        return res.status(500).json({ message: "Gagal menambahkan data" })
    }
}

async function updateCar(req: any, res: Response): Promise<any> {
    const { id } = req.params;

    try{
        let updateData = {
            ...req.body,
            updated_by: req.user.id,
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
        active: false,
        updated_by: req.user.id
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