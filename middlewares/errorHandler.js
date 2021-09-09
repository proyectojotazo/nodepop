/* eslint-disable no-unused-vars */

const routeNotFound = (err, req, res, next) => {

  const urlSplitted = req.url.split('/')

  if (urlSplitted[1].includes('apiv1')) res.status(404).json({error: 'Ruta no encontrada'}) // Vista de api
  else res.status(404).render('ads/adsErrNotFound') // Vista de frontend
  
}

module.exports = {
  routeNotFound
}