// Import Router
import { Router } from 'express'
const router = Router()

// ROUTER MAIN
router.get('/api/v1', (_req, res) => {
  res.json('Welcome')
})

// IMPORT CATEGORY ROUTER
import { router as categoryRouter } from './category.js'
router.use('/', categoryRouter)

export { router }
