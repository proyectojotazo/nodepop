const multer = require('multer')
const path = require('path')

const { imageFilter } = require('../utils')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/data/uploads/')
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const uploadFile = multer({storage, fileFilter: imageFilter }).single('photo')

module.exports = { uploadFile }