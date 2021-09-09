const checkEmptyParams = (queryParam = {}) => {

  //Funcion que eliminará los parámetros que vengan vacíos

  const paramsToCheck = {...queryParam}
  
  Object.keys(paramsToCheck).forEach( key => {
    if (isEmpty(paramsToCheck[key])){
      delete paramsToCheck[key]
    }
  })

  return paramsToCheck
}

const isEmpty = (param = '') => {
  return param === ''
}

module.exports = {
  checkEmptyParams
}