const imageFilter = (req, file, cb) => {
  const regex = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/
  const errMsg = 'Only image files are allowed!'

  if (!file.originalname.match(regex)) {
    req.fileValidationError = errMsg
    return cb(new Error(errMsg), false)
  }

  cb(null, true)
}

module.exports = imageFilter
