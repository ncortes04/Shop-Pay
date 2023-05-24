const { Schema, model } = require('mongoose')

const colorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
});

const Color = model('Color', colorSchema);

module.exports = Color;
