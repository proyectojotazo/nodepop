const asyncHandler = require('express-async-handler')

const Ad = require('../models/ad')

const { getQuery } = require('../utils/getQuery/getQuery')
const { getAdsRowed } = require('../utils/getAdsRowed')

const adsController = {}

adsController.getAds = asyncHandler(async(req, res) => {

  const [ query, optionals ] = getQuery(req.query)
  
  const ads = await Ad.find(query, null, optionals)
    
  const rows = getAdsRowed(ads)
  
  res.render('ads/adsIndex', { rows })

})

module.exports = adsController