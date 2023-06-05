const Item = require('../models/items');

module.exports = {
  async getTopTrendingItems(req, res) {
    try {
      const topTrendingItems = await Item.find()
        .sort({ purchaseCount: -1, averageRating: -1 }) // Sort by purchaseCount and averageRating in descending order
        .limit(3);
  
      res.status(200).json(topTrendingItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  async getBestSellingItems(req, res) {
    try {
      const bestSellingItems = await Item.find()
        .sort({ purchaseCount: -1 }) // Sort by purchaseCount in descending order
        .limit(3);

      res.status(200).json(bestSellingItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  async getFeaturedItems(req, res) {
    try {
      const featuredItems = await Item.find({ featured: true })
        .limit(3);

      res.status(200).json(featuredItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  
  async getAllItems(req, res) {
    try {
      const topTrendingItems = await Item.find()
        .sort({ purchaseCount: -1 })
        .limit(3);

      const bestSellingItems = await Item.find()
        .sort({ purchaseCount: -1 })
        .limit(3);

      const featuredItems = await Item.find({ featured: true })
        .limit(3);

      res.status(200).json({
        topTrendingItems,
        bestSellingItems,
        featuredItems
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
