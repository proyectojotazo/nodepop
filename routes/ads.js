/* eslint-disable no-unused-vars */
const adsRouter = require('express').Router()

const adsController = require('../controllers/adsController')


adsRouter.get('/', adsController.getAds)


module.exports = adsRouter