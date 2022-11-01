import { Router } from 'express'
const router = Router()
import { fetchAllCategories } from '../controllers/categoryController.js'

router.get('/api/v1/categories', fetchAllCategories)

export { router }
