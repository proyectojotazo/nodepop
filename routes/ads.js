/* eslint-disable no-unused-vars */

const adsRouter = require('express').Router()
const Ad = require('../models/ad')

const { getFilteredQuery } = require('../utils/getQuery')
const { getAdsRowed } = require('../utils/getAdsRowed')


adsRouter.get('/', async (req, res, next) => {

  const [ query, optionals ] = getFilteredQuery(req.query)
  
  const ads = await Ad.find(query, null, optionals)
  
  const rows = getAdsRowed(ads)
  

  res.render('adsIndex', { rows })
})

module.exports = adsRouter
