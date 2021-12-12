const { Requester } = require('cote')
const requester = new Requester({ name: 'worker-thumbnail' })

function thumbnailRequest(photoFilePath, thumbnailPath) {
  const req = {
    type: 'crear-thumbnail',
    photoFilePath,
    thumbnailPath,
  }

  requester
    .send(req)
    .then((msg) => console.log(msg))
    .catch((err) => console.error(err))
}

module.exports = thumbnailRequest
