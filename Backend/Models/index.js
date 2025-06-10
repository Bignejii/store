const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Product = require('./proudects')(sequelize, DataTypes);
// const Order = require('./orders')(sequelize, DataTypes); // Remove old Order model
const User = require('./users')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const Review = require('./Review')(sequelize, DataTypes); // Import the Review model
const Payment = require('./payment')(sequelize, DataTypes); // Import the Payment model

// Associations
Product.hasMany(Cart, { foreignKey: "productId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

// User-Cart associations
User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Review, { foreignKey: "productId" }); // A product can have many reviews
Review.belongsTo(Product, { foreignKey: "productId" }); // A review belongs to a product

User.hasMany(Review, { foreignKey: "userId" }); // A user can write many reviews
Review.belongsTo(User, { foreignKey: "userId" }); // A review belongs to a user

// Payment associations
User.hasMany(Payment, { foreignKey: "userId" });
Cart.hasMany(Payment, { foreignKey: "orderId" });

module.exports = {
  Product,
  // Order, // Remove old Order model
  User,
  Cart,
  Review, // Export the Review model
  Payment, // Export the Payment model
};