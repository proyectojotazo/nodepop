/* eslint-disable no-unused-vars */
// TODO: Delete the disabled eslint rule

const apiRouter = require('express').Router()
const Ad = require('../models/ad')

apiRouter.get('/', async (req, res, next) => {
  // Obtener todos los articulos
  const ads = await Ad.find()
  res.json(ads)
})

apiRouter.post('/', (req, res, next) => {
  // Crear anuncio
  const { nombre, venta, precio, photo, tag } = req.body
  const newAd = new Ad({
    nombre,
    venta,
    precio, 
    photo, 
    tag
  })
  
  newAd.save()
    .then(savedAd => {
      res.json(savedAd)
    })
    .catch(err => next(err))
  
})

module.exports = apiRouter