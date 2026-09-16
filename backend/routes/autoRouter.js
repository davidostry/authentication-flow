import {Router} from 'express'
import {allUsers, createNewUser, login} from '../controllers/authController.js'

const router = Router();

router.post("/register", createNewUser)

router.post("/login", login)

router.get("/users", allUsers)

export default router


