import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import '@shared/typeorm'
import GetException from '@shared/middlewares/GetException'
import uploadConfig from '@config/upload'
import { pagination } from 'typeorm-pagination'
import RateLimit from 'express-rate-limit'

const app = express()

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

app.use(limiter)

app.use(cors())
app.use(express.json())
app.use(pagination)

app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

app.use(GetException)

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆')
})
