module.exports = (req, res, next) => {
  req.session.regenerate((err) => {
    if (err) {
      next(err)
      return
    }
    res.redirect('/')
  })
}
