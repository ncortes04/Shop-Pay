const { Schema, model } = require('mongoose');

const sizeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
});

const Size = model('Sizes', sizeSchema);

module.exports = Size;
