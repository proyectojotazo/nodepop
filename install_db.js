const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const Ad = require('./models/ad')

const { MONGODB_URI } = require('./lib/config')

const { ads } = require('./ads.json')
const { fullads } = require('./fullads.json')

const argvs = process.argv

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
  console.info(`Connected to MongoDB, at ${mongoose.connection.name} database`)
  await deleteAllData()
  await loadDefaultData()
})

main()