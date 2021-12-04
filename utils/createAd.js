const createAd = (adParams = {}, model) => {
  const { nombre, venta, precio, photo, thumbnail, tags } = adParams
  // Eliminamos los valores 'null' y 'true' en caso de que se pasen
  const validTags = tags.filter((tag) => tag !== null && tag !== true)
  
  const newAd = new model({
    nombre,
    venta,
    precio,
    photo,
    thumbnail,
    tags:
      validTags.length !== 0
        ? validTags.map((tag) => tag.toLowerCase())
        : validTags,
    /**
     * Si el array viene vacío porque solo se pasó valores 'null' o 'true'
     * pasaremos 'validTags' directamente sin aplicar el 'toLowerCase' para
     * no generar errores no controlados
     */
  })

  return newAd
}

module.exports = createAd
