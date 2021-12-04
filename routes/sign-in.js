const signInRouter = require('express').Router()
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

const { User } = require('../models')

signInRouter.get('/', (req, res) => {
  const data = req.app.get('data')
  res.render('ads/sign-in', data)
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
  asyncHandler(async (req, res) => {
    let data = req.app.get('data')

    // Obtener datos introducidos
    const { email, password } = req.body

    // Seteamos los datos introducidos en locals.data
    data = { ...data, values: { email, password } }

    // Validación del registro con express-validator
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      errors.errors.forEach((errObj) => {
        data = {
          ...data,
          errors: {...data.errors, [errObj.param]: { message: res.__(errObj.msg) } },
        }
      })
    
      return res.render('ads/sign-in', data)
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
    } catch (error) {
      // 11000 Usuario duplicado en Mongo
      if (error.code === 11000) {
        data = {
          ...data,
          errors: {...data.errors, email: { message: res.__('User already exists') } },
        }
      }
      return res.render('ads/sign-in', data)
    }
  })
)

module.exports = signInRouter
