import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import fileUpload from 'express-fileupload'
import admin from './routes/admin.router.js'
import fields from './routes/fields.router.js'
import posts from './routes/posts.router.js'
import swagger from './swagger.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(fields)
app.use(admin)
app.use(posts)
app.use(swagger)

app.listen(PORT, ()=>console.log('http://localhost:' + PORT))