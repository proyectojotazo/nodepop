/* eslint-disable no-unused-vars */

const apiRouter = require('express').Router()

const apiController = require('../controllers/apiController')

const { postValidation } = require('../middlewares/errorHandler')


apiRouter.get('/', apiController.getAll)

apiRouter.get('/anuncios', apiController.getFiltered)

apiRouter.get('/tags', apiController.getTags)

apiRouter.post('/', apiController.post)

// Middleware validación POST
apiRouter.use(postValidation)

module.exports = apiRouter