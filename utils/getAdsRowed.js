const getAdsRowed = (adsList = []) => {
  /**
   * Función para facilitar la iteración y creación de 'rows' y 'cards'
   * en la vista 'adsForEach'
   */

  const rows = []
  let row = []

  adsList.forEach((ad) => {
    row.push(ad)
    if (row.length === 2) {
      rows.push(row)
      row = []
    }
  })

  if (row.length === 1) rows.push(row)

  /**
   * Si hemos recibido un numero par de anuncios rows =
   * [
   *    [ {ad}, {ad} ]
   * ]
   * Si no rows =
   * [
   *    [ {ad}, {ad} ],
   *    [ {ad},]
   * ]
   */

  return rows
}

module.exports = getAdsRowed
