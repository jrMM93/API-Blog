import { Router } from 'express'
const router = Router()
import {
  createArticle,
  deleteArticle,
  fetchAllArticles,
  fetchOneArticle,
  updateArticle,
} from '../controllers/articleController.js'
import { authorization } from '../middlewares/authMiddleware.js'

router.get('/api/v1/posts', fetchAllArticles)

router.get('/api/v1/posts/:id(\\d+)', fetchOneArticle)

router.post('/api/v1/posts', authorization, createArticle)

router.patch('/api/v1/posts/:id(\\d+)', authorization, updateArticle)

router.delete('/api/v1/posts/:id(\\d+)', authorization, deleteArticle)

export { router }
