const createAd = (adParams = {}, model) => {
  const { nombre, venta, precio, photo, thumbnail, tags } = adParams

  const filteredTags = tags.filter(tag => tag !== null)
  
  const newAd = new model({
    nombre,
    venta,
    precio,
    photo,
    thumbnail,
    tags: filteredTags.map(tag => tag.toLowerCase()),
  })

  return newAd
}

module.exports = createAd