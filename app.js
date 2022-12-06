const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const booksRouter = require('./routes/api/books')

const authRouter = require('./routes/api/auth')

const usersRouter = require('./routes/api/users')
const trainingsRouter = require('./routes/api/trainings')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/books', booksRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/trainings', trainingsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
