import { Router } from 'express'
const router = Router()
import {
  createArticle,
  fetchAllArticles,
  fetchOneArticle,
} from '../controllers/articleController.js'

router.get('/api/v1/posts', fetchAllArticles)

router.get('/api/v1/posts/:id(\\d+)', fetchOneArticle)
//TODO:slug
router.post('/api/v1/posts', createArticle)

export { router }
