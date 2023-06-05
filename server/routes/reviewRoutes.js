const router = require('express').Router();
const {authMiddleware} = require('../utils/AUTH')

const {
createReview,
deleteReview,
getAllReviews
} = require('../controllers/reviewControllers');

router.route('/review').post(authMiddleware, createReview).delete(authMiddleware , deleteReview).get(getAllReviews)

module.exports = router
