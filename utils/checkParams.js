const checkParams = (queryParam = {}) => {
  /**
       * Comprobamos los parámetros 'venta', 'start', 'limit' y 'precio'
       * recibidos por la query introducida en el navegador.
       */
  const paramsCopy = {...queryParam}      
  checkVentaParam(paramsCopy)
  checkStartLimitParam(paramsCopy)
  checkTagParam(paramsCopy)
  checkPrecioParam(paramsCopy)
      
  return paramsCopy
}
    
const checkVentaParam = (queryParam = {}) => {
  /**
       * Función que checkeará que el valor de 'venta' sea o 'true' o 'false'. 
       * En caso que en la query se pase un valor distinto, borraremos la 
       * propiedad 'venta' y no se filtrará por este parámetro 
       */
  const ventaParams = ['true', 'false']
      
  const getBool = (str = '') => {
    return str === 'true'
  }
      
  if (queryParam['venta']){
    if (ventaParams.includes(queryParam['venta'])) { // Si el valor de la propiedad es 'true' o 'false'
      queryParam['venta'] = getBool(queryParam['venta'])
    } else { // Si el valor de la propiedad no es 'true' o 'false'
      delete queryParam['venta']
    }
  }
}
    
const checkStartLimitParam = (queryParam = {}) => {
  /**
       * Función que checkeará que el valor de 'start' o 'limit' sea un valor numerico. 
       * En caso que en la query se pase un valor distinto, borraremos la 
       * propiedad 'start' o 'limit' y no se filtrará por este parámetro 
       */  
  const paramsToCheck = ['start', 'limit']
      
  paramsToCheck.forEach( param => {
    if (queryParam[param]){
      const reg = /^[0-9]$/
      if (!reg.test(queryParam[param])){ // Si no es un valor numérico
        delete queryParam[param]
      } else { // Si es un valor numérico
        queryParam[param] = Number(queryParam[param])
      }
    } 
  })
        
}
  
const checkTagParam = (queryParam = {}) => {
  /**
       * Función que checkeará que el valor de 'tag' sea uno de los tags correctos. 
       * En caso que en la query se pase un valor distinto, borraremos la 
       * propiedad 'tag' y no se filtrará por este parámetro 
       */
  
  const tagsPermitted = ['lifestyle', 'work', 'mobile', 'motors']
  
  if (!tagsPermitted.includes(queryParam['tag'])){
    delete queryParam['tag']
  }
}
  
const checkPrecioParam = (queryParam = {}) => {
  /**
       * Función que checkeará que el valor del 'precio' sea un valor numérico. 
       * En caso que en la query se pase un valor distinto, borraremos la 
       * propiedad 'precio' y no se filtrará por este parámetro 
       */

  if (Object.prototype.hasOwnProperty.call(queryParam, 'precio')){
    const reg = /^[0-9]{1,}([.]{1}[0-9]{1,})?$/
    const nums = queryParam['precio'].split('-') || [] 
  
    nums.forEach(num => {
      if (num !== '' && !reg.test(num)){
        delete queryParam['precio']
      }
    })
  }
  
  
  
}

module.exports = {
  checkParams
}