// eslint-disable-next-line no-unused-vars
const tokenErrors = (err, req, res, next) => {
  if (err.status === 404){
    next(err)
    return
  }
  res.status(err.status).json({message: err.message, status: err.status})
  return
}

module.exports = tokenErrors
