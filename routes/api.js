/* eslint-disable no-unused-vars */
// TODO: Delete the disabled eslint rule

const apiRouter = require('express').Router()
const Ad = require('../models/ad')
const { getFilteredQuery } = require('../utils/getQuery')

apiRouter.get('/', async (req, res, next) => {
  // Obtener todos los articulos
  const ads = await Ad.find()
  res.json(ads)
})

apiRouter.get('/anuncios', async (req, res, next) => {
  // Articulos filtrados en API
  const [ query, optionals ] = getFilteredQuery(req.query)
  const adsFiltered = await Ad.find(query, null, optionals)
  
  res.json(adsFiltered)
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