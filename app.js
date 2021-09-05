const config = require('./utils/config')
const mongoose = require('mongoose')

const express = require('express')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const adsRouter = require('./routes/ads')
const apiRouter = require('./routes/api')

const app = express()

// connection to MONGODB
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.info('Connected to MongoDB')
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err.message)
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', adsRouter)
app.use('/apiv1', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
