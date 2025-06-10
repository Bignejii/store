const express = require('express');
const {
  createReview,
  getReviewsByProduct,
  getAllReviews, // Import getAllReviews
  deleteReview,
} = require('../Controllers/reviewController');

const router = express.Router();

// Route to create a new review
router.post('/', createReview);

// Route to get all reviews
router.get('/', getAllReviews); // Add this route for fetching all reviews

// Route to get all reviews for a specific product
router.get('/product/:productId', getReviewsByProduct);

// Route to delete a review by ID
router.delete('/:id', deleteReview);

module.exports = router;