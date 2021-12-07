const getParsedPaths = (pathToParse) => {
  let thumbnailPath = pathToParse
    .split('\\')
    .map((el) => (el === 'uploads' ? 'thumbnails' : el))
    .join('\\')

  let photoPathForAd = pathToParse
    .split('\\')
    .filter((el) => el !== 'public') // quitamos 'public' del path
    .join('\\')

  let thumbnailPathForAd = thumbnailPath
    .split('\\')
    .filter((el) => el !== 'public') // quitamos 'public' del path
    .join('\\')

  return {
    photoPath: pathToParse,
    thumbnailPath,
    photoPathForAd,
    thumbnailPathForAd,
  }
}

module.exports = getParsedPaths
