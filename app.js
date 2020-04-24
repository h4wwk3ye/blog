const express = require('express')
const app = express()
require('express-async-errors');
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const logintRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', logintRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app