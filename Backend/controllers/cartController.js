const { Cart, Product, User } = require("../Models/index")

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log('addToCart received:', { userId, productId, quantity });

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the item is already in the cart
    const existingCartItem = await Cart.findOne({ where: { userId, productId } });
    if (existingCartItem) {
      // Update the quantity if the item already exists
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: "Cart updated", cart: existingCartItem });
    }

    // Add new item to the cart
    const cartItem = await Cart.create({ userId, productId, quantity });
    res.status(201).json({ message: "Item added to cart", cart: cartItem });
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get cart items
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [Product],
    });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cartItem = await Cart.findOne({ where: { userId, productId } });

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cartItem.destroy();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.destroy({ where: { userId } });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      include: [Product, User], // optional: include related info
    });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

Cart.associate = (models) => {
  Cart.belongsTo(models.User, { foreignKey: "userId" });
  Cart.belongsTo(models.Product, { foreignKey: "productId" });
};