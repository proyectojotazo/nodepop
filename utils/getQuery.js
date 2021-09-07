const { transformParams } = require('./checkParams')


const getFilteredQuery = (queryParams = {}) => {

  /**
     * Parametros que pueden llegar:
     * - nombre: STRING. Puede ser un trozo del nombre total
     * - venta: BOOL
     * - Precio: NUMBER
     * - Tag: STRING. Solo se puede buscar 1 tag
     * - Start: NUMBER. Inicio de los elementos a mostrar
     * - Limit: NUMBER. Fin de los elementos a mostrar
     * - sort: STRING. Propiedad por la cual ordenar, se ordenará por precio o nombre (ACTUALMENTE)
     */

  /**
     * queryParams tendrá los parametros de la query introducida en el navegador
     * Poniendo como ejemplo:
     * http://localhost:8080/apiv1/anuncios?tag=mobile&&nombre=ip&precio=50-&start=0&limit=2&sort=precio
     * queryParams = {
     *  tag:'mobile', nombre: 'ip', precio: '50-', start: '0', limit: '2', sort: 'precio'
     * }
     */
  
  const okParams = transformParams(queryParams)
  /**
   * okParams = {
   *    tag: 'mobile',
        nombre: 'ip',
        precio: '50-',
        start: 0,
        limit: 2,
        sort: 'precio'
   * }
   */
  const x = getFilterQuery(okParams)

  console.log(x)
  return getFilterQuery(okParams)
  
}

const getFilterQuery = (checkedParams = {}) => {

  /**
     * Función que nos devolverá la 'filteredQuery' y 'optionals'.
     * En 'filteredQuery' encontraremos los parametros básicos, siendo estos:
     * {nombre, precio, tag, venta} y en 'optionals' vendrán:
     * {start, limit, sort} 
     */

  const filteredQuery = {}
  const optionals = getOptionals(checkedParams)

  Object.keys(checkedParams).forEach( key => {
    if (key === 'nombre'){
      /**
         * Creamos la regexp para que busque por el principio de la palabra
         * ignorando mayusculas o minusculas.
         */
      const regex = new RegExp(`^${checkedParams[key]}`, 'i')  
      filteredQuery[key] = regex
    } else if (key === 'precio') {
      filteredQuery[key] = getPrecioQuery(checkedParams[key])
    } else if (key === 'tags'){
      filteredQuery[key] = checkedParams[key]
    } else if (key === 'venta'){
      filteredQuery[key] = checkedParams[key]
    }
  })

  return [ filteredQuery, optionals ]
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
    precioQuery = Number(precioParam)
  } else { // Cuando precioParam sea cualquier otro caso
    if (paramSplitted[0] === ''){ // si paramSplitted = ['', '200']
      precioQuery = {'$lte': Number(paramSplitted[1])}
    } else if (paramSplitted[1] === ''){ // si paramSplitted = ['12', '']
      precioQuery = {'$gte': Number(paramSplitted[0])}
    } else { // si paramSplitted = ['12', '200]
      precioQuery = {'$gte': Number(paramSplitted[0]), '$lte': Number(paramSplitted[1])}
    } 
  }

  return precioQuery
}

const getOptionals = (checkedParams = {}) => {
  /**
     * Nos devuelve los parametros opcionales de búsqueda, siendo estos
     * { start, limit, sort}
     * 'start' será convertido a 'skip' para la query de mongoose
     * Tanto 'limit', como 'sort' son parametros admitidos por tal
     * Solo hay 2 tipos de 'sort', por nombre o por precio. En caso de que sort
     * sea por precio, añadiremos tambien, que seguidamente ordene por nombre, pues
     * al dar el caso de tener el mismo precio nos ordenará, por consiguiente, 
     * por el nombre
     */
  const optionals = {}
  const hasProperty = Object.prototype.hasOwnProperty

  if (hasProperty.call(checkedParams, 'start')){
    optionals['skip'] = checkedParams['start']
  }

  if (hasProperty.call(checkedParams, 'limit')){
    optionals['limit'] = checkedParams['limit']
  }

  if (hasProperty.call(checkedParams, 'sort')){
    optionals['sort'] = { [checkedParams['sort']] : 1}
    if (!hasProperty.call(optionals['sort'], 'nombre')){
      optionals['sort'] = { ...optionals['sort'], nombre : 1}
    }
  }

  return optionals
}

module.exports = {
  getFilteredQuery
}