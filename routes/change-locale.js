/* eslint-disable no-unused-vars */
const changeLocaleRouter = require('express').Router()

changeLocaleRouter.get('/:locale', (req, res, next) => {
  const { locale } = req.params

  res.cookie('nodeapi-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  })

  const { referer: lastUrl } = req.headers

  console.log(lastUrl)

  res.redirect(lastUrl)
})

module.exports = changeLocaleRouter