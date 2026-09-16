import { findUser, createUser } from '../DAL/user.js'
import { hashPassword } from '../services/authService.js'

export async function createNewUser(req, res) {
    try {


        const { userName, email, password } = req.body
        const existUser = await findUser(email);
        if (existUser) return res.status(209).json({ message: "user already exist" });
        const hash = await hashPassword(password);
        await createUser(userName, email, hash);
        res.status(201).json({ "message": "user registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error"})
        

    }
}










