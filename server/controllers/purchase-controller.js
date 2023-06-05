const Purchase = require('../models/purchase');
const User = require('../models/user');

module.exports = {
  // Purchase an item
  async purchaseItem({ body, user = null }, res) {
    try {
      const { user_id, items, totalPrice } = body;

      // Create an array of purchase items
      const purchaseItems = items.map((item) => ({
        item: item.item_id,
        quantity: item.quantity,
      }));

      // Create a new purchase record
      const purchase = new Purchase({
        user: user_id,
        items: purchaseItems,
        totalPrice,
      });

      // Save the purchase record
      await purchase.save();

      res.status(200).json({ message: 'Purchase successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Get all purchases (only accessible to admins)
  async getPurchases(req, res) {
    try {
      // Check if the requesting user is an admin
      const foundUser = await User.findOne({
        _id: req.user._id,
        role: 'admin',
      });

      if (!foundUser) {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
      }

      // Retrieve all purchases
      const purchases = await Purchase.find();

      res.status(200).json(purchases);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
