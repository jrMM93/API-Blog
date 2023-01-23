import { Router } from 'express'
import { createUser } from '../controllers/userController.js'
const router = Router()

router.post('/api/v1/register', createUser)

export { router }
