const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  photo: String,
  tag: [String]
})

/*
Seteamos el 'toJSON' para que no nos muestre el campo '__v' y para que 
el campo 'id' no se muestre '_id'
*/

adSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Ad', adSchema)