const { Responder } = require('cote')
const { createThumbnail } = require('../utils')

const responder = new Responder({ name: 'servicio thumbnail' })

const measures = {
  width: 100,
  height: 100,
}

responder.on('crear-thumbnail', async (req,) => {
  const { photoFilePath, thumbnailPath } = req
  try {
    await createThumbnail(photoFilePath, thumbnailPath, measures)
    console.log(`Thumbnail created at: ${thumbnailPath}`)
  } catch (error) {
    console.error(error.message)
  }
})
