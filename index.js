//-- Environnement
import 'dotenv/config'

//-- Modules
import express from 'express'
const app = express()

import { router } from './app/routes/index.js'

//-- Cookie-parser
// import cookieParser from 'cookie-parser'
// app.use(cookieParser())

//-- Security
import helmet from 'helmet'
app.use(helmet())

//-- Encoding
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//--CORS
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE'
  )
  next()
})

app.use(router)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(
    `\x1b[1;33m\u26a1 Server running on : http://localhost:${PORT} \u26a1\x1b[0m`
  )
})
