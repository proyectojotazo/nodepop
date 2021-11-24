/* eslint-disable no-unused-vars */
const adsRouter = require('express').Router()

const { adsController } = require('../controllers')

adsRouter.get('/', adsController.getAds)

adsRouter.get('/login', adsController.getLoginView)

adsRouter.get('/sign-in', adsController.getSignInView)

adsRouter.post('/sign-in', adsController.postSignIn)

adsRouter.get('/create-ad', adsController.getCreateAdView)

module.exports = adsRouter
