/* eslint-disable no-unused-vars */

const adsRouter = require('express').Router()
const Ad = require('../models/ad')

adsRouter.get('/', async (req, res, next) => {

  const ads = await Ad.find()

  res.render('adsIndex', { ads })
})

module.exports = adsRouter
