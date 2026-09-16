import {Router} from 'express'
import {allUsers, createNewUser, login} from '../controllers/authController.js'
import { auth } from '../middleware/authMiddleware.js';

const router = Router();

router.post("/register", createNewUser)

router.post("/login", login)

router.get("/users", auth ,allUsers)

export default router


