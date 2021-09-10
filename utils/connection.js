const config = require('./config')
const mongoose = require('mongoose')


// connection to MONGODB
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.info(`Connected to MongoDB, in ${mongoose.connection.name} database `)
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err.message)
  })