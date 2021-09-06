/* eslint-disable no-unused-vars */

const adsRouter = require('express').Router()
const Ad = require('../models/ad')
const { getFilteredQuery } = require('../utils/getQuery')

adsRouter.get('/', async (req, res, next) => {

  const [ query, optionals ] = getFilteredQuery(req.query)
  
  const ads = await Ad.find(query, null, optionals)

  res.render('adsIndex', { ads })
})

module.exports = adsRouter
