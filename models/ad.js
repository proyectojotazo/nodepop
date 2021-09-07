const mongoose = require('mongoose')

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
    enum: {
      values: ['lifestyle', 'work', 'mobile', 'motor'],
      message: '{VALUE} no es un tag válido'
    },
    validate: {
      validator: (v) => v.length !== 0, // Validamos que no venga vacío el arr
      message: 'Ha de tener 1 tag mínimo'
    }
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