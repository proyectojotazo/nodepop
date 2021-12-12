const { Responder } = require('cote')
const { createThumbnail } = require('../utils')

const responder = new Responder({ name: 'service-thumbnail' })

const measures = {
  width: 100,
  height: 100,
}

responder.on('crear-thumbnail', async (req, done) => {
  const { photoFilePath, thumbnailPath } = req
  try {
    await createThumbnail(photoFilePath, thumbnailPath, measures)
    done(null, `Thumbnail created at: ${thumbnailPath}`)
  } catch (error) {
    done(error.message, 'An error has ocurred...')
  }
})
