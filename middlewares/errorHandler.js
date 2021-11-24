/* eslint-disable no-unused-vars */

const { codifyError } = require('../utils')

const routeNotFound = (err, req, res, next) => {
  const url = req.originalUrl
  const regex = new RegExp('/apiv1')

  if (regex.test(url)) res.status(404).json({ error: 'Ruta no encontrada' })
  // Vista de api
  else res.status(404).render('ads/not-found') // Vista de frontend
}

const postValidation = (err, req, res, next) => {
  const errorCodified = codifyError(err)

  res.status(400).json(errorCodified)
}

module.exports = {
  routeNotFound,
  postValidation,
}
