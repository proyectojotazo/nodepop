const mongoose = require('mongoose')

const { tagsValidators } = require('./customValidators')

const adSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Nombre del anuncio requerido'],
    index: true,
  },
  venta: {
    type: Boolean,
    required: [true, 'Tipo de venta requerido'],
    index: true,
  },
  precio: {
    type: Number,
    required: [true, 'Precio del articulo requerido'],
    index: true,
  },
  photo: {
    type: String,
    required: [true, 'Imagen del articulo requerida'],
  },
  tags: {
    type: [String],
    validate: tagsValidators,
    index: true,
  },
})

/*
Seteamos el 'toJSON' para que no nos muestre el campo '__v' y para que 
el campo 'id' no se muestre como '_id'
Si queremos NO mostrar en la api el ID deberiamos borrar 
'returnedObject.id = returnedObject._id.toString()'
*/

adSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Ad', adSchema)
