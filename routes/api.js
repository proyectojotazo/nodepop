const apiRouter = require('express').Router()

const { upload } = require('../middlewares')

const { apiController } = require('../controllers')

const { jwtAuth } = require('../middlewares')

apiRouter.post('/', 
  jwtAuth, 
  upload, 
  apiController.post)

apiRouter.get('/', jwtAuth, apiController.getAll)

apiRouter.get('/anuncios', jwtAuth, apiController.getFiltered)

apiRouter.post('/authenticate', apiController.authenticate)

apiRouter.get('/tags', apiController.getTags)

module.exports = apiRouter
