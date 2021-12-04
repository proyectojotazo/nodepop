/* eslint-disable no-unused-vars */
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const { Ad, User } = require('../models')

const {
  createAd,
  getTags,
  getQuery,
  createThumbnail,
  parsePath,
} = require('../utils')

const apiController = {}

apiController.getAll = asyncHandler(async (req, res, next) => {
  // Obtener todos los articulos
  const ads = await Ad.find()

  res.json(ads)
})

apiController.getFiltered = asyncHandler(async (req, res, next) => {
  // Articulos filtrados en API
  const [query, optionals] = getQuery(req.query)

  const adsFiltered = await Ad.find(query, null, optionals)

  if (adsFiltered.length === 0)
    return res.json({
      message: res.__('No ads with the specified parameters were found'),
    })

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

  if (!req.file) {
    const err = {
      errors: {
        photo: {
          name: 'ValidatorError',
          message: 'Archivo de foto requerido',
        },
      },
      _message: 'Ad validation failed',
    }
    return res.status(400).json({ err })
  }

  const photoFilePath = parsePath(req.file.path) // data\\uploads\\photo-1638538318979.jpg
  const thumbnailPath = parsePath(photoFilePath, true) // data\\thumbnails\\photo-1638538318979.jpg
  await createThumbnail(photoFilePath, thumbnailPath)
  const data = { ...req.body, photo: photoFilePath, thumbnail: thumbnailPath }

  const newAd = createAd(data, Ad)
  const savedAd = await newAd.save()

  res.status(201).json(savedAd)
})

apiController.authenticate = asyncHandler(async (req, res, next) => {
  // Recogemos emaill y password del usuario que hace la petición
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
