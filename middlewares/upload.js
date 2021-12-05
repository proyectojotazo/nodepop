const multer = require('multer')
const uploadFile = require('../lib/multerConfig.js')

const upload = (req, res, next) => {
  uploadFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(err)
    } else if (err) {
      // An unknown error occurred when uploading.
      err = {
        message: err.message,
        status: 400,
      }
      return next(err)
    } else if (!req.file) {
      // No file
      const err = new Error('')
      err.errors = {
        photo: {
          name: 'ValidatorError',
          message: 'Archivo de foto requerido',
        },
      }
      err._message = 'Ad validation failed'
      return next(err)
    }
    // Everything went fine.
    next()
  })
}

module.exports = upload
