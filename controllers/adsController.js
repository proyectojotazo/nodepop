const asyncHandler = require('express-async-handler')

const { Ad } = require('../models')

const { getQuery } = require('../utils')

const adsController = {}

adsController.getAds = asyncHandler(async (req, res) => {
  const [query, optionals] = getQuery(req.query)
  const hasParams = Object.keys(req.query).length

  const ads = await Ad.find(query, null, optionals)

  res.render('ads/index', { ads, hasParams })
})

module.exports = adsController
