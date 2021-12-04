const { codifyApiError } = require('../utils')

// eslint-disable-next-line no-unused-vars

// Codificamos los errores de validación que vienen de mongo
const postApiValidation = (err, req, res, next) => {

  // Si viene un error de token lo redirigimos al siguiente middleware de error
  if (err.status === 401) return next(err)

  const errorCodified = codifyApiError(err)

  res.status(400).json(errorCodified)
}

module.exports = postApiValidation