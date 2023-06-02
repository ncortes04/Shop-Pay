const Item = require('../models/items');
const Reviews = require('../models/Review')
const User = require('..//models/users')


module.exports = {
// Create a new review for a car /reviews
async createReview({ user = null, body }, res) {
  try {
    const { item_id, rating, comment, header } = body;
    const item = await Item.findById(item_id);
    const { _id } = user;
    const review = await Reviews.create({
      user_id: _id,
      item_id: item_id,
      rating: rating,
      comment: comment,
      header: header,
    });
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.status(201).json({ review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create review' });
  }
},

// Delete a review by its ID'/reviews/:id'
async deleteReview({user = null, body}, res){
  try {
    console.log(user)
    const review = await Reviews.findByPk(body.id);
    if(user.id !== review.user_id){
      return res.status(403).json({ error: 'Access Denied' });
    }
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await review.destroy();

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
},
// Get all reviews for a car '/reviews/:carId'
async getAllReviews(req, res) {
  try {
    const reviews = await Reviews.find({
      item_id: req.params.item_id,
    }).populate({ path: 'user_id', select: 'id username' });

    res.json({ reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
},
}





