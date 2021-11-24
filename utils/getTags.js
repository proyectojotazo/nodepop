const getTags = (ads = []) => {
  // Función que devuelve los tags disponibles

  const tagsFiltered = []

  ads.forEach((ad) => {
    ad.tags.forEach((tag) => {
      if (!tagsFiltered.includes(tag)) tagsFiltered.push(tag)
    })
  })

  return tagsFiltered
}

module.exports = getTags
