const apiRouter = require('express').Router()

const { uploadFile } = require('../lib/multerConfig')

const { apiController } = require('../controllers')

const { jwtAuth } = require('../middlewares')

apiRouter.post('/', 
  jwtAuth, 
  uploadFile, 
  apiController.post)

apiRouter.get('/', jwtAuth, apiController.getAll)

apiRouter.get('/anuncios', jwtAuth, apiController.getFiltered)

apiRouter.post('/authenticate', apiController.authenticate)

apiRouter.get('/tags', apiController.getTags)

module.exports = apiRouter
