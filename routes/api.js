const apiRouter = require('express').Router()

const { apiController } = require('../controllers')

const { upload, jwtAuth } = require('../middlewares')

apiRouter.post('/', 
  jwtAuth, 
  upload, 
  apiController.post)

apiRouter.get('/', apiController.getAll)

apiRouter.get('/anuncios', jwtAuth, apiController.getFiltered)

apiRouter.post('/authenticate', apiController.authenticate)

apiRouter.get('/tags', apiController.getTags)

module.exports = apiRouter
