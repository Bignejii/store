const express = require("express");
const router = express.Router();
const { addToCart, getCartItems, removeFromCart, clearCart, getAllCarts } = require("../controllers/cartController");

// Add item to cart
router.post("/add", addToCart);

// Get cart items
router.get("/:userId", getCartItems);

// Remove item from cart
router.delete("/remove", removeFromCart);

// Clear cart
router.delete("/clear/:userId", clearCart);

router.get('/', getAllCarts);

module.exports = router;