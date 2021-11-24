const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email de usuario requerido'],
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Contraseña requerida'],
  },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// TODO: Hashear el password del model

module.exports = mongoose.model('User', userSchema)
