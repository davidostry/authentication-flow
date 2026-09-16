import {Router} from 'express'
import {createNewUser} from '../controllers/authController.js'

const router = Router();

router.post("/register", createNewUser)

export default router


