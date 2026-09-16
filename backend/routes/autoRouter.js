import {Router} from 'express'
import {createNewUser, login} from '../controllers/authController.js'

const router = Router();

router.post("/register", createNewUser)

router.post("/login", login)

export default router


