const setLocalValues = (req, res, next) => {

  // Comprobamos si está logado
  res.locals.isLogged = !!req.session.usuarioLogado
  
  // Valores para formularios de login y registro
  res.locals.data = {
    values: {
      email: '',
      password: '',
    },
    errors: {
      email: {
        message: '',
      },
      password: {
        message: '',
      },
    },
  }
  next()
}

module.exports = setLocalValues
