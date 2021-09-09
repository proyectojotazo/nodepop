
const createAd = (adParams = {}, model) => {
  const { nombre, venta, precio, photo, tags } = adParams

  const newAd = new model({
    nombre, 
    venta,
    precio, 
    photo, 
    tags:tags.map(tag => tag.toLowerCase())
  })

  return newAd
}

module.exports = {
  createAd
}