/* eslint-disable no-unused-vars */
const adsRouter = require('express').Router()

const { adsController } = require('../controllers')

adsRouter.get('/', adsController.getAds)


module.exports = adsRouter
