const mongoose = require('mongoose');
const Items = require('./items');

const reviewSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Items',
    required: true,
  },
});

reviewSchema.post('save', async function (doc) {
  try {
    const numReviews = await Reviews.countDocuments({ item_id: doc.item_id });
    const averageRating = await Reviews.aggregate([
      { $match: { item_id: doc.item_id } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } },
    ]);
    await Items.findByIdAndUpdate(doc.item_id, {
      averageRating: averageRating[0].averageRating,
      ratingCount: numReviews,
    });
  } catch (error) {
    console.error(error);
  }
});

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;
