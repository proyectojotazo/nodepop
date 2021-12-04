const asyncHandler = require('express-async-handler')

const { Ad } = require('../models')

const { getQuery, getAdsRowed } = require('../utils')

const adsController = {}

adsController.getAds = asyncHandler(async (req, res) => {
  const [query, optionals] = getQuery(req.query)
  const hasParams = Object.keys(req.query).length
  console.log(hasParams)

  const ads = await Ad.find(query, null, optionals)

  const rows = getAdsRowed(ads)

  res.render('ads/index', { rows, hasParams })
})

module.exports = adsController
