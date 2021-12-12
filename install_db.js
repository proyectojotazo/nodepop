/* eslint-disable no-console */
const mongoose = require('mongoose')
const readline = require('readline')

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
  
  await mongoose.connect(MONGODB_URI)
  console.info(`Connected to MongoDB, at ${mongoose.connection.name} database`)

  if (!(await askYesNo('Estas seguro que quieres inicializar la BD? (Si/No)\n'))){
    console.log('Se ha cancelado la inicialización de la base de datos.')
    return process.exit(0)
  }

  await deleteAllData()
  await loadDefaultData()
  mongoose.connection.close()
}

function askYesNo(questionText) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question(questionText, (answer) => {
      rl.close()
      if (answer.toLowerCase() === 'si') {
        resolve(true)
        return
      }
      resolve(false)
    })
  })
}

main().catch((err) => console.log(err))
