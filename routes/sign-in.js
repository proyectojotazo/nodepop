const signInRouter = require('express').Router()
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

const { User } = require('../models')

signInRouter.get('/', (req, res) => {
  res.render('ads/sign-in')
})

signInRouter.post(
  '/',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .bail()
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .bail()
      .isLength({ min: 4 })
      .withMessage('password must be at least 4 characters'),
  ],
  asyncHandler(async (req, res, next) => {
    // Obtener datos introducidos
    const { email, password } = req.body

    // Seteamos los datos introducidos en locals.data
    res.locals.data = { ...res.locals.data, values: { email, password } }

    // Validación del registro con express-validator
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      errors.errors.forEach((errObj) => {
        res.locals.data = {
          ...res.locals.data,
          errors: {...res.locals.data.errors, [errObj.param]: { message: res.__(errObj.msg) } },
        }
      })
    
      return res.render('ads/sign-in')
    }

    try {
      // Almacenar usuario en la base de datos
      const newUser = new User({
        email,
        password: await User.hashPassword(password),
      })
      await newUser.save()
      // Redirigir a la home (de momento)
      res.redirect('/')
    } catch (err) {
      // 11000 Usuario duplicado en Mongo
      if (err.code === 11000) {
        res.locals.data = {
          ...res.locals.data,
          errors: {...res.locals.data.errors, email: { message: res.__('User already exists') } },
        }
      } else {
        next(err)
      }
      return res.render('ads/sign-in')
    }
  })
)

module.exports = signInRouter
