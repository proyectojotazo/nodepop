const codifyApiError = (error) => {
  // Codificamos el error a mostrar en la api de las validaciones de mongo del anuncio
  const errorCodified = {}

  Object.keys(error.errors).forEach((nameParam) => {
    const { name } = error.errors[nameParam]
    const { message } = error.errors[nameParam]

    errorCodified[nameParam] = { name, message }
  })

  errorCodified.status = 400

  return errorCodified
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err._message) {
    // mongo errors validations
    err = codifyApiError(err)
  }

  if (err.status === 401) {
    // JWT Errors
    err = {
      message: res.__(err.message),
      status: err.status,
    }
  }

  if (err.status === 404) {
    // not found errors
    const { originalUrl } = req
    const regex = new RegExp('/apiv1/')

    if (regex.test(originalUrl)) {
      // Vista de api
      err = {
        message: res.__('Route not found'),
        status: 404,
      }
    } else {
      res.status(404).render('ads/not-found') // Vista de frontend
      return
    }
  }

  return res.status(err.status).json({ err })
}

module.exports = errorHandler
