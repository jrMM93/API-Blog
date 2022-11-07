import { Router } from 'express'
const router = Router()
import {
  fetchAllCategories,
  fetchArticlesByCategoryId,
} from '../controllers/categoryController.js'

router.get('/api/v1/categories', fetchAllCategories)

router.get('/api/v1/posts/category/:id(\\d+)', fetchArticlesByCategoryId)

export { router }
