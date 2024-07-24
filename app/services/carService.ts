import carRepository, { carType, carInput, carDelete } from "../repositories/carRepository";
import { cloudinary } from "../middleware/cloudinary";

export default new class CarService {
    async create(data: carInput): Promise<carInput> {
        return await carRepository.create(data);
    }

    async update(id: any, updateArgs: carType) {
        return carRepository.update(id, updateArgs);
    }

    async delete(id: any, updateArgs: carDelete) {
        return carRepository.delete(id, updateArgs);
    }

    async findAll(conditionArgs: any) {
        return carRepository.findAll(conditionArgs);
    }

    async findById(id: any) {
        return carRepository.findById(id);
    }

    async upload(file: any) {
        const fileBase64 = file?.buffer.toString("base64")
        const fileString = `data:${file?.mimetype};base64,${fileBase64}`
        try {
            const result = await cloudinary.uploader.upload(fileString)
            return result
        } catch (e) {
            throw (e)
        }
    }
}