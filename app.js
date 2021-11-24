// Mongoose Connection
require('./lib/connection')

// Default middlewares
const express = require('express')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// Error middlewares
const { routeNotFound } = require('./middlewares/errorHandler')

// Routes
const { adsRouter, apiRouter, changeLocaleRouter } = require('./routes')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


const i18n = require('./lib/i18nConfigure')
app.use(i18n.init)

// routes
app.use('/', adsRouter)
app.use('/apiv1', apiRouter)
app.use('/change-locale', changeLocaleRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// Errors
app.use(routeNotFound) // Ads/Apiv1 route not found

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
