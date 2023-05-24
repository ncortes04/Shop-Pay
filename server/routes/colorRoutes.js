const express = require('express');
const router = express.Router();
const {
  addColor,
  getColors
} = require('../controllers/color-controller');
const { authMiddleware } = require('../utils/AUTH');

router.route('/addcolor').post(authMiddleware, addColor);
router.route('/getcolors').get(getColors);

module.exports = router;
