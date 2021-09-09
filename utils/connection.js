const config = require('./config')
const mongoose = require('mongoose')


// connection to MONGODB
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.info('Connected to MongoDB')
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err.message)
  })