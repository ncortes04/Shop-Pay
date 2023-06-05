const { Schema, model } = require('mongoose');

const purchaseItemSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const purchaseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [purchaseItemSchema],
  totalPrice: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

purchaseSchema.pre('save', async function (next) {
  try {
    const itemIds = this.items.map((item) => item.item);
    const itemsToUpdate = await model('Item').find({ _id: { $in: itemIds } });
    itemsToUpdate.forEach((itemToUpdate) => {
      const purchaseItem = this.items.find((item) => item.item.toString() === itemToUpdate._id.toString());
      if (purchaseItem) {
        itemToUpdate.purchaseCount += purchaseItem.quantity;
      }
    });
    await Promise.all(itemsToUpdate.map((itemToUpdate) => itemToUpdate.save()));
    next();
  } catch (error) {
    next(error);
  }
});

const Purchase = model('Purchase', purchaseSchema);

module.exports = Purchase;
