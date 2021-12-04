// eslint-disable-next-line no-unused-vars
const routeNotFound = (err, req, res, next) => {
  const url = req.originalUrl
  const regex = new RegExp('/apiv1')

  if (regex.test(url)) res.status(404).json({ error: res.__('Route not found') })
  // Vista de api
  else res.status(404).render('ads/not-found') // Vista de frontend
}

module.exports = routeNotFound
