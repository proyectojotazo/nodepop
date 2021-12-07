const sharp = require('sharp')

const mainDir = __dirname
  .split('\\')
  .filter((el) => el !== 'utils')
  .join('\\')

const createThumbnail = async (pathToRead, pathToWrite, measures) => {
  const readDir = `${mainDir}\\${pathToRead}`
  const writeDir = `${mainDir}\\${pathToWrite}`
  try {
    await sharp(readDir)
      .resize(measures.width, measures.height)
      .toFile(writeDir)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = createThumbnail
