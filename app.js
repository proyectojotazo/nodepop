// Mongoose Connection
require('./lib/connection')

// Node-modules requires
const express = require('express')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// Error middlewares
const { tokenErrors, routeNotFound, errorHandler } = require('./middlewares')

// Routes
const {
  adsRouter,
  apiRouter,
  changeLocaleRouter,
  loginRouter,
  createAdRouter,
  signInRouter,
} = require('./routes')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// global locals
// TODO: Setearlo en los forms
app.set('data', {
  values: {
    email: '',
    password: '',
  },
  errors: {
    email: {
      message: '',
    },
    password: {
      message: '',
    },
  },
})

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const i18n = require('./lib/i18nConfigure')
app.use(i18n.init)

// views routes
app.use('/', adsRouter)
app.use('/login', loginRouter)
app.use('/sign-in', signInRouter)
app.use('/create-ad', createAdRouter)
app.use('/change-locale', changeLocaleRouter)

// api routes
app.use('/apiv1', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// TODO: Manejar los errores en un middleware
// Errors

app.use(errorHandler)
// app.use(tokenErrors) // ApiToken errors
// app.use(routeNotFound) // Ads/Apiv1 route not found

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
