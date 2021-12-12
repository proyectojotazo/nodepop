const sessionAuth = (req, res, next) => {
  if (req.session.usuarioLogado){
    next()
    return
  }
  res.redirect(`/login?next=${req.originalUrl}`)
}

module.exports = sessionAuth

