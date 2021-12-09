/* eslint-disable no-unused-vars */
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const { Ad, User } = require('../models')

const thumbnailRequest = require('../microservices/thumbnailRequest')

const { createAd, getTags, getQuery, getParsedPath } = require('../utils')

const apiController = {}

apiController.getAll = asyncHandler(async (req, res, next) => {
  // Obtener todos los articulos
  const { token } = req.query
  const paramToRedirect = (token && `?token=${token}`) || ''

  res.redirect(`/apiv1/anuncios${paramToRedirect}`)
})

apiController.getFiltered = asyncHandler(async (req, res, next) => {
  // Articulos filtrados en API
  const onlyToken = Object.keys(req.query).length === 1

  const [query, optionals] = getQuery(req.query)

  const adsFiltered = await Ad.find(query, null, optionals)

  if (adsFiltered.length === 0) { // Si no vienen anuncios
    if (onlyToken) { // si solo se le ha pasado token
      return res.json({
        message: res.__('No ads. Create your own!'),
      })
    } // si hay mas parametros en la URL
    return res.json({
      message: res.__('No ads with the specified parameters were found'),
    })
  }
  res.json(adsFiltered)
})

apiController.getTags = asyncHandler(async (req, res, next) => {
  //Mostrar tags

  const ads = await Ad.find()
  const tags = getTags(ads)

  res.json(tags)
})

apiController.post = asyncHandler(async (req, res, next) => {
  // Crear anuncio

  console.log('path => ', req.file.path)

  const { photoPath, thumbnailPath, photoPathForAd, thumbnailPathForAd } =
    getParsedPath(req.file.path)

  try {
    await thumbnailRequest(photoPath, thumbnailPath)
  } catch (e) {
    next(e)
    return
  }

  const data = {
    ...req.body,
    photo: photoPathForAd,
    thumbnail: thumbnailPathForAd,
  }

  const newAd = createAd(data, Ad)
  const savedAd = await newAd.save()

  res.status(201).json(savedAd)
})

apiController.authenticate = asyncHandler(async (req, res, next) => {
  // Recogemos email y password del usuario que hace la petición
  const { email, password } = req.body

  // Comprobamos que el usuario exista en la base de datos
  const user = await User.findOne({ email })

  // Si no se encuentra o no coincide la contraseña --> error
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: res.__('Invalid credentials') })
  }

  // Si se encuentra generamos el token y lo almacenamos en el objeto request
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  })

  return res.json({ token })
})

module.exports = apiController
