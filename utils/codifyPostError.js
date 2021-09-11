const codifyError = (error) => {

  const errorCodified = {}

  Object.keys(error.errors).forEach(nameParam => {
    const { name } = error.errors[nameParam]
    const { message } = error.errors[nameParam]
    
    errorCodified[nameParam] = { name, message }
  })

  return errorCodified
}

module.exports = {
  codifyError
}