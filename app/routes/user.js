import { Router } from 'express'
import { login } from '../controllers/authController.js'
import { createUser } from '../controllers/userController.js'
const router = Router()

router.post('/api/v1/register', createUser)

router.post('/api/v1/login', login)

export { router }
