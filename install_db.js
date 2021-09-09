const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const Ad = require('./models/ad')

const { MONGODB_URI } = require('./utils/config')

const { ads } = require('./ads.json')


const deleteAllData = asyncHandler(async () => {
  
  await Ad.deleteMany()
  console.log('All data successfully deleted')
  
})

const loadDefaultData = asyncHandler(async () => {
  
  await Ad.insertMany(ads)
  console.log('Data inserted successfully')
  process.exit()

})

mongoose.connect(MONGODB_URI)
  .then(asyncHandler(async() => {
    console.info('Connected to MongoDB')

    await deleteAllData()
    await loadDefaultData()

  }))
  .catch(err => {
    console.error('Error connecting to MongoDB\n', err.message)
  })


