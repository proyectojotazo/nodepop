const isValidName = (name = '') => {
  const reg = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i
  return reg.test(name)
}

const isValidPrice = (price = '') => {
  const reg = /^[0-9]{1,}([.]{1}[0-9]{1,})?$/
  const nums = price.split('-') || [] 

  let isValid = true
  
  // Casos principales a invalidar
  if (nums.length > 3) return false // 23---... 23-32-... 23-32-12...

  if (nums.length === 3 && 
    (nums[0] === '' && nums[1] === '') || // caso --23
    (nums[0] === '' && nums[2] === '') || // caso -23-
    (nums[1] === '' && nums[2] === '')){ // caso 23--
    return false
  }

  nums.forEach(num => {
    if (num !== '' && !reg.test(num)){
      isValid = false
    }
  })

  return isValid
}

const isValidVenta = (venta = '') => {
  const validValues = ['true', 'false']

  return validValues.includes(venta.toLowerCase())//Ignoramos mayus
}

const isValidSkipLimit = (skip = '') => {
  const reg = /^[0-9]{1,2}$/
  return reg.test(skip)
}

const isValidSort = (sort = '') => {
  const validValues = ['nombre', 'precio']

  return validValues.includes(sort.toLowerCase())//Ignoramos mayus
}

module.exports = {
  isValidName,
  isValidPrice,
  isValidVenta,
  isValidSkipLimit,
  isValidSort
}