const { Schema, model } = require('mongoose');

const variationSchema = new Schema({
  item_id: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
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

const Variation = model('Variation', variationSchema);

module.exports = Variation;
