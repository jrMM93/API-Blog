import { Router } from 'express'
const router = Router()
import {
  fetchAllArticles,
  fetchOneArticle,
} from '../controllers/articleController.js'

router.get('/api/v1/posts', fetchAllArticles)

router.get('/api/v1/posts/:id(\\d+)', fetchOneArticle)

export { router }
