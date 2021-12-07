const jwt = require('jsonwebtoken')

const jwtAuth = async (req, res, next) => {
  const jwtToken = req.get('Authorization') || req.query.token || req.body.token
  // Comprobar que tengo token
  if (!jwtToken) {
    const error = new Error(res.__('No token provided'))
    error.status = 401
    next(error)
    return
  }

  // Comprobar que el token es válido
  try {
    await jwt.verify(jwtToken, process.env.JWT_SECRET)
    next()
    return
  } catch (error) {
    error.status = 401
    next(error)
    return
  }
}

module.exports = jwtAuth 
