/* eslint-disable no-unused-vars */
// TODO: Delete the disabled eslint rule

const apiRouter = require('express').Router()
const Ad = require('../models/ad')

const asyncHandler = require('express-async-handler')

const { createAd } = require('../utils/createAd')
const { getFilteredQuery } = require('../utils/getFilters/getQuery')
const { getTags } = require('../utils/getTags')

apiRouter.get('/', asyncHandler(async (req, res, next) => {
  // Obtener todos los articulos
  
  const ads = await Ad.find()

  res.json(ads)  
  
}))

apiRouter.get('/anuncios', asyncHandler(async (req, res, next) => {
  // Articulos filtrados en API

  const [ query, optionals ] = getFilteredQuery(req.query)

  const adsFiltered = await Ad.find(query, optionals)

  if (adsFiltered.length === 0) return res.json({message: 'No se han encontrado anuncios con los parametros especificados'})
  
  res.json(adsFiltered)
}))

apiRouter.get('/tags', asyncHandler(async (req, res, next) => {
  //Mostrar tags
  
  const ads = await Ad.find()
  const tags = getTags(ads)
    
  res.json(tags)

}))

apiRouter.post('/', asyncHandler(async (req, res, next) => {
  // Crear anuncio

  const newAd = createAd(req.body, Ad)

  const savedAd = await newAd.save()

  res.status(201).json(savedAd)
  
}))

module.exports = apiRouter