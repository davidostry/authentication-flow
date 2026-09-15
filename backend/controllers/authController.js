import {findUser} from '../DAL/user.js'

export async function createUser(req, res){
    const {userName, email, password} = req.body
    const existUser = findUser(email);
    if (existUser) 
    res.status(201).json({"message": "user registered successfully"})
}