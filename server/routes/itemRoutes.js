const express = require('express');
const router = express.Router();
const {
  createItem,
  servePosts,
  getIndividualItem,
  getInventoryCount,
  addVariation
} = require('../controllers/item-controllers');
const { authMiddleware } = require('../utils/AUTH');

router.route('/createpost').post(authMiddleware, createItem);
router.route('/getposts').get(servePosts);
router.route('/single/:id').get(getIndividualItem);
router.route('/inventory/count').post(getInventoryCount);
router.route('/variations').post(authMiddleware, addVariation);

module.exports = router;
