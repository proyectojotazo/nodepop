const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const argvs = process.argv

const Ad = require('./models/ad')

const { MONGODB_URI } = require('./utils/config')

const { ads } = require('./ads.json')
const { fullads } = require('./fullads.json')


const deleteAllData = asyncHandler(async () => {

  await Ad.deleteMany()
  console.log('All data successfully deleted')

})

const loadDefaultData = asyncHandler(async () => {
  const adsToAdd = argvs[2] === 'fullads' ? fullads : ads
  await Ad.insertMany(adsToAdd)
  console.log('Data inserted successfully')
  process.exit()

})

const main = asyncHandler(async () => {
  await mongoose.connect(MONGODB_URI)
  console.info('Connected to MongoDB')
  await deleteAllData()
  await loadDefaultData()
})

main()

// mongoose.connect(MONGODB_URI)
//   .then(asyncHandler(async() => {
//     console.info('Connected to MongoDB')

//     await deleteAllData()
//     await loadDefaultData()

//   }))
//   .catch(err => {
//     console.error('Error connecting to MongoDB\n', err.message)
//   })


