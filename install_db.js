const mongoose = require('mongoose')

const { Ad, User } = require('./models')

const { MONGODB_URI } = require('./lib/config')

const { ads } = require('./ads.json')

const addDefaultUser = async () => {
  const defaultUser = {
    email: 'user@example.com',
    password: await User.hashPassword('1234'),
  }

  await User.create(defaultUser)

  console.log('1 user added')
}

const deleteAllData = async () => {
  const { deletedCount: deletedAds } = await Ad.deleteMany()
  const { deletedCount: deletedUsers } = await User.deleteMany()

  console.log(`Deleted ${deletedAds} ads`)
  console.log(`Deleted ${deletedUsers} user`)
}

const loadDefaultData = async () => {
  await addDefaultUser()
  const result = await Ad.insertMany(ads)
  console.log(`${result.length} ads added`)
}

const main = async () => {
  // TODO: Asegurar BBDD
  await mongoose.connect(MONGODB_URI)
  console.info(`Connected to MongoDB, at ${mongoose.connection.name} database`)
  await deleteAllData()
  await loadDefaultData()
  mongoose.connection.close()
}

main().catch((err) => console.log(err))
