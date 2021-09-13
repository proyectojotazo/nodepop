/* eslint-disable no-unused-vars */

const asyncHandler = require('express-async-handler')

const Ad = require('../models/ad')

const { createAd } = require('../utils/createAd')
const { getTags } = require('../utils/getTags')
const { getQuery } = require('../utils/getQuery/getQuery')


const apiController = {}

apiController.getAll = asyncHandler( async (req, res, next) => {
  // Obtener todos los articulos

  const ads = await Ad.find()

  res.json(ads)

})

apiController.getFiltered = asyncHandler( async (req, res, next) => {
  // Articulos filtrados en API
  const [ query, optionals ] = getQuery(req.query)
  
  const adsFiltered = await Ad.find(query, null, optionals)
  
  if (adsFiltered.length === 0) return res.json({message: 'No se han encontrado anuncios con los parametros especificados'})
    
  res.json(adsFiltered)
})

apiController.getTags = asyncHandler( async (req, res, next) => {

  //Mostrar tags
  
  const ads = await Ad.find()
  const tags = getTags(ads)
    
  res.json(tags)

})

apiController.post = asyncHandler( async (req, res, next) => {

  // Crear anuncio
  
  const newAd = createAd(req.body, Ad)
  const savedAd = await newAd.save()
  res.status(201).json(savedAd)
})

module.exports = apiController