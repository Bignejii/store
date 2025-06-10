module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // Order-related fields
    email: {
      type: DataTypes.STRING,
      allowNull: true, // allowNull true for cart, required for order
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: true, // allowNull true for cart, required for order
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      defaultValue: "pending",
    },
    paymentMethod: {
      type: DataTypes.ENUM("stripe", "paypal", "gumroad", "manual"),
      defaultValue: "stripe",
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "userId" });
    Cart.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return Cart;
};