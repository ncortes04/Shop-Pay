const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;
const Variation = require('./variations');

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
    type: ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String
  },
  averageRating: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      type: ObjectId,
      ref: 'Reviews'
    }
  ],
  featured: {
    type: Boolean,
    default: false
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  variations: [Variation.schema],
  purchaseCount: {
    type: Number,
    default: 0
  }
});

const Item = model('Item', itemSchema);

module.exports = Item;
