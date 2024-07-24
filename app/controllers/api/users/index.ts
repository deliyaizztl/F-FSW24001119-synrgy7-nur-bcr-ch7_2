import userService from '../../../services/userService';
import { Request, Response } from 'express';
import { encryptPassword, checkPassword, createToken } 
from '../../../utils/encrypt';

async function whoAmI(req:any, res:Response){
    res.json({
        message: "Berhasil",
        data: req.user
    })
}

async function createAdmin(req:Request, res:Response){
    const {email, password, nama, avatar, role} = req.body;
    if(!email || !password || !nama ){
        return res.status(400).json({
            message: "Data tidak lengkap"
        })
    }

    try{
        const userExist = await userService.checkDuplicate(email);
        if(userExist){
            return res.status(409).json({
                message: "Email sudah terdaftar!"
            })
        }

        const hashPassword = await encryptPassword(password);
        const user = await userService.create({
            email,
            password: hashPassword,
            nama,
            avatar,
            role: role || 'admin'
        });

        res.json({
            message: "Berhasil",
            data: {
                id: user.id,
                email: user.email,
                nama: user.nama,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        })
    } catch(e){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function getUsers(req: Request, res: Response) {
    const users = await userService.findAll({});
    res.status(200).json(users);
}

export default {
    whoAmI,
    createAdmin,
    getUsers
}