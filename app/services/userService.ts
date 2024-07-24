import userRepository from "../repositories/userRepository";

export default new class UserService{
    async checkDuplicate(email: any){
        return await userRepository.checkDuplicate(email);
    }
    
    async create(data: any){
        return await userRepository.create(data);
    }
    
    async update(id: any, updateArgs: any){
        return userRepository.update(id, updateArgs);
    }

    async delete(id: any, updateArgs: any){
        return userRepository.delete(id, updateArgs);
    }

    async findAll(conditionArgs: any){
        return userRepository.findAll(conditionArgs);
    }

    async findByEmail(email: any){
        return userRepository.findByEmail(email);
    }

    async findById(id: any){
        return userRepository.findById(id);
    }
}