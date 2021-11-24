const asyncHandler = require('express-async-handler')

const { Ad, User } = require('../models')

const { getQuery, getAdsRowed } = require('../utils')

const adsController = {}

adsController.getAds = asyncHandler(async (req, res) => {
  const [query, optionals] = getQuery(req.query)

  const ads = await Ad.find(query, null, optionals)

  const rows = getAdsRowed(ads)

  res.render('ads/index', { rows })
})

adsController.getLoginView = (req, res) => {
  res.render('ads/login')
}

adsController.getSignInView = (req, res) => {
  res.render('ads/sign-in')
}

adsController.getCreateAdView = (req, res) => {
  res.render('ads/create-ad')
}

adsController.postSignIn = asyncHandler(async (req, res) => {

  // TODO: Try/Catch?

  // Obtener datos introducidos
  const { email, password } = req.body
  // Almacenar usuario en la base de datos
  const newUser = new User({
    email,
    password,
  })

  await newUser.save()
  // Redirigir a la home (de momento)
  res.redirect('/')
})

module.exports = adsController
