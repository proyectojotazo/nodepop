const { Requester } = require('cote')
const requester = new Requester({ name: 'apiController-thumbnail' })

async function thumbnailRequest(photoFilePath, thumbnailPath) {
  const req = {
    type: 'crear-thumbnail',
    photoFilePath,
    thumbnailPath,
  }
  // eslint-disable-next-line no-useless-catch
  try {
    await requester.send(req)
  } catch (error) {
    throw error
  }
}

module.exports = thumbnailRequest
