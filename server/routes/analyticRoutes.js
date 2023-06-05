const express = require('express');
const router = express.Router();
const {
  getBestSellingItems,
  getFeaturedItems,
  getTopTrendingItems,
  getAllItems
} = require('../controllers/analytics-controller');
const { authMiddleware } = require('../utils/AUTH');

router.route('/bestsellers').get(getBestSellingItems);
router.route('/featured').get(getFeaturedItems);
router.route('/hottrending').get(getTopTrendingItems);
router.route('/allanalytics').get(getAllItems);

module.exports = router;
