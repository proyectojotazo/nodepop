/* eslint-disable no-unused-vars */

const adsRouter = require('express').Router()
const Ad = require('../models/ad')

const asyncHandler = require('express-async-handler')

const { getAdsRowed } = require('../utils/getAdsRowed')
const { getQuery } = require('../utils/getQuery/getQuery')


adsRouter.get('/', asyncHandler(async (req, res, next) => {

  const [query, optionals ] = getQuery(req.query)
  
  const ads = await Ad.find(query, null, optionals)
  
  const rows = getAdsRowed(ads)

  res.render('ads/adsIndex', { rows })
      
}))

module.exports = adsRouter
