const { Schema, model } = require('mongoose');

const variationSchema = new Schema({
color: {
    type: Schema.Types.ObjectId,
    ref: 'Color',
    required: true
    },
    size: {
    type: Schema.Types.ObjectId,
    ref: 'Size',
    required: true
    },
    inventory: {
    type: Number,
    default: 0
    }
});

const itemSchema = new Schema({
  brand: {
    type: String
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String
  },
  variations: [variationSchema] // Array of variations
});

const Item = model('Item', itemSchema);

module.exports = Item;
