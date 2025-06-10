const { Review, Product, User } = require('../Models');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    const review = await Review.create({ userId, productId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Get all reviews for a product
const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.findAll({
      where: { productId },
      include: [
        {
          model: User,
          attributes: ['id', 'username'], // Use 'username' instead of 'name'
        },
      ],
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['username'], // Include username
        },
      ],
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await review.destroy();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

module.exports = {
  createReview,
  getReviewsByProduct,
  getAllReviews,
  deleteReview,
};