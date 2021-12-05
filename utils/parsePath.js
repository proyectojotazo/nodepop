const parsePath = (pathToParse) => {
  let photoFilePath = ''
  let thumbnailPath = ''

  photoFilePath = pathToParse
    .split('\\')
    .filter((el) => el !== 'public') // quitamos 'public' del path
    .join('\\')

  thumbnailPath = photoFilePath
    .split('\\')
    .map((el) => (el === 'uploads' ? 'thumbnails' : el))
    .join('\\')

  return { photoFilePath, thumbnailPath }
}

module.exports = parsePath
