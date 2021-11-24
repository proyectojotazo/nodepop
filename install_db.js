const mongoose = require('mongoose')

const { Ad } = require('./models')

const { MONGODB_URI } = require('./lib/config')

const { ads } = require('./ads.json')
const { fullads } = require('./fullads.json')

const argvs = process.argv

const deleteAllData = async () => {
  const { deletedCount } = await Ad.deleteMany()
  console.log(`Deleted ${deletedCount} ads`)
}

const loadDefaultData = async () => {
  const adsToAdd = argvs[2] === 'fullads' ? fullads : ads
  const result = await Ad.insertMany(adsToAdd)
  console.log(`Inserted ${result.length} ads`)
}

const main = async () => {
  await mongoose.connect(MONGODB_URI)
  console.info(`Connected to MongoDB, at ${mongoose.connection.name} database`)
  await deleteAllData()
  await loadDefaultData()
  mongoose.connection.close()
}

main().catch((err) => console.log(err))
