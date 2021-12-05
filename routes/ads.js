/* eslint-disable no-unused-vars */
const adsRouter = require('express').Router()

const { adsController } = require('../controllers')

adsRouter.get('/', adsController.getAds)

adsRouter.get('/ad/:id', (req, res, next) => {
  // Show 1 Ad
  return res.render('ads/single-ad')
})


module.exports = adsRouter
