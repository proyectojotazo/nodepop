const { isValidName, isValidPrice, isValidVenta, isValidSkipLimit, isValidSort } = require('./paramsCheckers')

const getQuery = (queryParams = {}) => {

  const [ query, options ] = splitParams(queryParams)
  
  checkEmptyParams(query, options)
  checkValidParams(query, options)
  transformParams(query, options)

  return [ query, options ]

}

const splitParams = (queryParams = {}) => {

  /**
   * Función que nos dividirá la query de los optional omitiendo cualquier
   * parametro que no sea de los permitidos
   */

  const paramsQueryToCheck = [ 'nombre', 'venta', 'precio', 'tags' ]
  const paramsOptionsToCheck = [ 'start', 'limit', 'sort' ]

  const query = {}
  const options = {}

  Object.keys(queryParams).forEach( key => {
    if (paramsQueryToCheck.includes(key)){ // query
      query[key] = queryParams[key]
    } else if (paramsOptionsToCheck.includes(key)){ // optionals
      if (key === 'start'){ // Pasaremos la propiedad que nos viene como 'start' a 'skip' para filtrar
        options['skip'] = queryParams[key]      
      } else {
        options[key] = queryParams[key]
      }      
    }
  })

  return [ query, options ]
}

const checkEmptyParams = (...objs) => {

  /*
  * Funcion que eliminará los parámetros que vengan vacíos tanto de query
  * como de optionals
  */

  const isEmpty = (param = '') => {
    return param === ''
  }

  objs.forEach(obj => {
    Object.keys(obj).forEach( key => {
      if (isEmpty(obj[key])){
        delete obj[key]
      }
    })
  })
    
}
 
const checkValidParams = (queryParams = {}, optParams = {}) => {
  

  Object.keys(queryParams).forEach( key => {
    switch (key) {
    case 'nombre': 
      if (!isValidName) delete queryParams[key]
      break
    case 'precio':
      if (!isValidPrice) delete queryParams[key]
      break
    case 'venta':
      if (!isValidVenta) delete queryParams[key]
      break
    }
  })

  Object.keys(optParams).forEach( key => {
    if (key === 'skip' || key === 'limit') {
      if (!isValidSkipLimit(optParams[key])) delete optParams[key]
    } else { // Solo puede llegar sort
      if (!isValidSort) delete optParams[key]
    }
  })
}

const transformParams = (queryParams = {}, optParams = {}) => {

  Object.keys(queryParams).forEach( key => {
    switch (key) {
    case 'nombre': // A nombre le pasaremos una regex
      queryParams[key] = new RegExp(`^${queryParams[key]}`, 'i')
      break
    case 'precio':
      queryParams[key] = getPrecioQuery(queryParams[key])
      break
    case 'venta':
      queryParams[key] = queryParams[key] === 'true'
      break
    }
  })

  Object.keys(optParams).forEach( key => {
    if( key === 'skip' || key === 'limit'){
      optParams[key] = Number(optParams[key])  
    }
  })
}

const getPrecioQuery = (precioParam = '') => {
  /**
     * precioParam puede ser:
     * - '12' (busqueda por el precio exacto)
     * - '12-' (busqueda por precio desde)
     * - '12-200' (busqueda por precio desde/hasta)
     * - '-200' (busqueda por precio menos de)
     */
  let precioQuery = {}

  const paramSplitted = precioParam.split('-')
  const longParam = paramSplitted.length
    
  if (longParam === 1){ // Cuando precioParam sea '12'
    precioQuery = Number(paramSplitted[0]) 
  } else { // Cuando precioParam sea cualquier otro caso
    if (paramSplitted[0] === ''){ // si paramSplitted = ['', '200'] o precioParam = -200
      precioQuery = {'$lte': Number(paramSplitted[1])}
    } else if (paramSplitted[1] === ''){ // si paramSplitted = ['12', ''] o precioParam = 12-
      precioQuery = {'$gte': Number(paramSplitted[0])}
    } else { // si paramSplitted = ['12', '200] o percioParam = 12-200
      precioQuery = {'$gte': Number(paramSplitted[0]), '$lte': Number(paramSplitted[1])}
    } 
  }

  return precioQuery
}

module.exports = {
  getQuery
}