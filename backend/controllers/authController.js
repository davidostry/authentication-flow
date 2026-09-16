import { findUser, createUser } from '../DAL/user.js'
import { comparePassword, hashPassword } from '../services/authService.js'
import { generateToken } from '../services/userService.js';

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
        res.status(500).json({ message: "server error" })


    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const existUser = await findUser(email);
        if (!existUser) return res.status(404).json({ message: "user not found" });
        const valid = await comparePassword(password, existUser.hash);
        if (!valid) return res.status(401).json({ message: "password not correct" });

        const token = generateToken(existUser._id)
        res.json(token)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error" });
    }
}









