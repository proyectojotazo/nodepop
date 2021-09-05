const { MONGODB_URI } = require('./utils/config')
const mongoose = require('mongoose')
const Ad = require('./models/ad')
const { ads } = require('./ads.json')


const deleteAllData = async () => {
  try {
    await Ad.deleteMany()
    console.log('All data successfully deleted')
  } catch (err) {
    console.log(err)
  }
}

const loadDefaultData = async () => {
  try {
    await Ad.insertMany(ads)
    console.log('Data inserted successfully')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.info('Connected to MongoDB')
  })
  .catch(err => {
    console.error('Error connecting to MongoDB\n', err.message)
  })


deleteAllData()
loadDefaultData()