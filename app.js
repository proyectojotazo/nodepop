// Mongoose Connection
require('./lib/connection')

// Node-modules requires
const express = require('express')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')

// Custom Middlewares
const { errorHandler, setLocalValues } = require('./middlewares')

// Routes
const {
  adsRouter,
  apiRouter,
  changeLocaleRouter,
  loginRouter,
  logoutRouter,
  signInRouter,
} = require('./routes')

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

app.use(session({
  name: 'user-session',
  secret: process.env.USER_SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 dias
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI})
}))

app.use(setLocalValues)

const i18n = require('./lib/i18nConfigure')
app.use(i18n.init)

// views routes
app.use('/', adsRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/sign-in', signInRouter)
app.use('/change-locale', changeLocaleRouter)

// api routes
app.use('/apiv1', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// Errors
app.use(errorHandler)

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
