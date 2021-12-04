const Jimp = require('jimp')

const createThumbnail = async (pathToRead, pathToWrite) => {

  try {
    const img = await Jimp.read(`public\\${pathToRead}`)
    img
      .cover(100, 100)
      .write(`public\\${pathToWrite}`)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = createThumbnail