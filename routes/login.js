/* eslint-disable no-unused-vars */
const loginRouter = require('express').Router()
const asyncHandler = require('express-async-handler')

const { body, validationResult } = require('express-validator')

const { User } = require('../models')

loginRouter.get('/', (req, res) => {
  res.render('ads/login')
})

loginRouter.post(
  '/',
  [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  asyncHandler(async (req, res, next) => {
    // Obtener los datos introducidos
    const { email, password } = req.body

    // Seteamos los datos introducidos en locals.data
    res.locals.data = { ...res.locals.data, values: { email, password } }

    // Validación del registro con express-validator
    const errors = validationResult(req)

    // Si hay errores con express-validator
    if (!errors.isEmpty()) {
      errors.errors.forEach((errObj) => {
        res.locals.data = {
          ...res.locals.data,
          errors: {
            ...res.locals.data.errors,
            [errObj.param]: { message: res.__(errObj.msg) },
          },
        }
      })
      
      return res.status(400).render('ads/login')
    }

    // Si se han validado los valores de express-validator entonces:
    // Buscar usuario en mongo

    const user = await User.findOne({ email })
    // Si no lo encuentra o la contraseña no coincide --> error
    if (!user || !(await user.comparePassword(password))) {
      res.locals.data = {
        ...res.locals.data,
        errors: {
          email: { message: res.__('Invalid credentials') },
          password: { message: res.__('Invalid credentials') },
        },
      }
      return res.status(400).render('ads/login')
    }

    // TODO: crear la sesion
    req.session.usuarioLogado = {
      _id: user._id
    }
    
    // redireccionar a la home
    return res.redirect('/')
  })
)

module.exports = loginRouter
