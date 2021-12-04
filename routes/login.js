/* eslint-disable no-unused-vars */
const loginRouter = require('express').Router()
const asyncHandler = require('express-async-handler')

const { body, validationResult } = require('express-validator')

const { User } = require('../models')

loginRouter.get('/', (req, res) => {
  res.render('ads/login', req.app.get('data'))
})

loginRouter.post(
  '/',
  [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  asyncHandler(async (req, res, next) => {
    let data = req.app.get('data')
    // Obtener los datos introducidos
    const { email, password } = req.body

    // Seteamos los datos introducidos en locals.data
    data = { ...data, values: { email, password } }

    // Validación del registro con express-validator
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      errors.errors.forEach((errObj) => {
        data = {
          ...data,
          errors: {
            ...data.errors,
            [errObj.param]: { message: res.__(errObj.msg) },
          },
        }
      })

      return res.render('ads/login', data)
    }

    // Buscar usuario en mongo

    const user = await User.findOne({ email })
    // Si no lo encuentra o la contraseña no coincide --> error
    if (!user || !(await user.comparePassword(password))) {
      data = {
        ...data,
        errors: {
          email: { message: res.__('Invalid credentials') },
          password: { message: res.__('Invalid credentials') },
        },
      }
      return res.render('ads/login', data)
    }

    // redireccionar a la home por el momento
    return res.redirect('/')
  })
)

module.exports = loginRouter
