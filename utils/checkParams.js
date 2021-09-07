const transformParams = (queryParam = {}) => {
  /**
       * Función que transformará los parámetros de 'String' a su correspondiente
       * valor.
       * 'Venta' ha de ser BOOLEAN
       * 'Start' y 'Limit' han de ser NUMBER
       * 'Precio' simplemente comprobamos que sea un valor numerico 
       */
  const paramsCopy = {...queryParam}      
  transformVentaParam(paramsCopy)
  transformStartLimitParam(paramsCopy)
  transformPrecioParam(paramsCopy)
  return paramsCopy
}
    
const transformVentaParam = (queryParam = {}) => {
  /**
       * Función que checkeará que el valor de 'venta' sea o 'true' o 'false'. 
       * En caso que en la query se pase un valor distinto, borraremos la 
       * propiedad 'venta' y no se filtrará por este parámetro 
       */
  const ventaParams = ['true', 'false']
      
  if (queryParam['venta']){
    if (ventaParams.includes(queryParam['venta'])) { // Si el valor de la propiedad es 'true' o 'false'
      queryParam['venta'] = queryParam['venta'] === 'true'
    } else { // Si el valor de la propiedad no es 'true' o 'false'
      delete queryParam['venta']
    }
  }
}
    
const transformStartLimitParam = (queryParam = {}) => {
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
  
const transformPrecioParam = (queryParam = {}) => {
  /**
       * Función que checkeará que el valor del 'precio' sea un valor numérico. 
       * En caso que en la query se pase un valor distinto, borraremos la 
       * propiedad 'precio' y no se filtrará por este parámetro 
       */

  if (queryParam['precio']){
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
  transformParams
}