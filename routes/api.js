/* eslint-disable no-unused-vars */
// TODO: Delete the disabled eslint rule

const apiRouter = require('express').Router()
const Ad = require('../models/ad')
const { createAd } = require('../utils/createAd')

const { getFilteredQuery } = require('../utils/getFilters/getQuery')
const { getTags } = require('../utils/getTags')

apiRouter.get('/', async (req, res, next) => {
  // Obtener todos los articulos
  try {
    const ads = await Ad.find()

    res.json(ads)  
  } catch (e) {
    console.log(e)
    next(e)
  }
  
})

apiRouter.get('/anuncios', async (req, res, next) => {
  // Articulos filtrados en API
  try {
    const [ query, optionals ] = getFilteredQuery(req.query)
    const adsFiltered = await Ad.find(query, null, optionals)

    if (adsFiltered.length === 0) return res.json({message: 'No se han encontrado anuncios con los parametros especificados'})
  
    res.json(adsFiltered)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

apiRouter.get('/tags', async (req, res, next) => {
  //Mostrar tags
  
  try{
    const ads = await Ad.find()
    const tags = getTags(ads)
    
    res.json(tags)
  } catch(e){
    console.log(e)
    next(e)
  }
  
})

apiRouter.post('/', (req, res, next) => {
  // Crear anuncio

  const newAd = createAd(req.body, Ad)

  newAd.save()
    .then(savedAd => {
      res.json(savedAd)
    })
    .catch(e => next(e))
  
})

module.exports = apiRouter