/* eslint-disable no-unused-vars */

const adsRouter = require('express').Router()
const Ad = require('../models/ad')

const asyncHandler = require('express-async-handler')

const { getFilteredQuery } = require('../utils/getFilters/getQuery')
const { getAdsRowed } = require('../utils/getAdsRowed')


adsRouter.get('/', asyncHandler(async (req, res, next) => {

  const [ query, optionals ] = getFilteredQuery(req.query)

  const ads = await Ad.find(query, null, optionals)
  const rows = getAdsRowed(ads)

  res.render('ads/adsIndex', { rows })
      
}))

module.exports = adsRouter
