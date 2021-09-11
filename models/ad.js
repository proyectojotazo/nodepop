const mongoose = require('mongoose')

const { tagsValidators } = require('./customValidators')

const adSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: [true, 'Nombre del anuncio requerido']
  } ,
  venta: {
    type: Boolean,
    required: [true, 'Tipo de venta requerido']
  },
  precio: {
    type: Number,
    required: [true, 'Precio del articulo requerido']
  },
  photo: String,
  tags: {
    type: [String],
    validate: tagsValidators
  }
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