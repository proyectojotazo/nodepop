/* eslint-disable no-unused-vars */
const createAdRouter = require('express').Router()
// TODO1: Desarrollar esta ruta

createAdRouter.get('/',(req, res, next) => {
  res.render('ads/create-ad')
})

module.exports = createAdRouter