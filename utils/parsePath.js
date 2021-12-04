const parsePath = (pathToParse, isThumbnail = false) => {

  let parsedPath = []

  if (isThumbnail) {
    parsedPath = pathToParse
      .split('\\')
      .map((el) => (el === 'uploads' ? 'thumbnails' : el))
      .join('\\')
  } else {
    parsedPath = pathToParse
      .split('\\')
      .filter((el) => el !== 'public') // quitamos 'public' del path
      .join('\\')
  }

  return parsedPath
}

module.exports = parsePath
