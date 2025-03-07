import userService from '../../../services/userService';
import { Request, Response } from 'express';
import { encryptPassword, checkPassword, createToken }
    from '../../../utils/encrypt';
import { UsersModel } from '../../../models/users';
import dotenv from 'dotenv';

dotenv.config();

async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await userService.findByEmail(email);
        const isPasswordCorrect = await checkPassword(user.password, password)

        if (!isPasswordCorrect) {
            return res.status(404)
                .json({
                    message: "Email atau password salah"
                })
        }

        const token = await createToken({
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at
        })

        res.status(200).json({
            message: "Berhasil Login",
            data: {
                id: user.id,
                email: user.email,
                nama: user.nama,
                token,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        })
    } catch (e) {
        console.error(e)
        res.status(404).json({
            message: "Email atau password salah"
        })
    }


}

async function register(req: Request, res: Response) {
    const { email, password, nama, avatar } = req.body;
    try {
        const userExist = await userService.checkDuplicate(email);
        if (userExist) {
            return res.status(409).json({
                message: "Email sudah terdaftar!"
            })
        }

        const encryptedPassword = await encryptPassword(password)
        const user = await userService.create({
            email,
            password: encryptedPassword,
            nama,
            role: 'user',
            avatar
        })

        res.status(201).json({
            message: "Berhasil Register",
            data: {
                id: user.id,
                email: user.email,
                nama: user.nama,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export default {
    login,
    register,
}