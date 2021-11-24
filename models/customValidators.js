const tagsValidators = [
  {
    validator: (v) => v.every((tag) => tag !== ''),
    message: 'No puede contener tags vacíos',
  },
  {
    validator: (v) => v.length !== 0,
    message: 'Debe contener mínimo 1 tag',
  },
  {
    validator: (v) => v.length < 5,
    message: 'Debe contener maximo 4 tags',
  },
]

module.exports = {
  tagsValidators,
}
