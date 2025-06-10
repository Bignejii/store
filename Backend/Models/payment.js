module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
    paymentMethod: {
      type: DataTypes.ENUM("card", "paypal", "crypto", "other"),
      defaultValue: "card",
    },
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.User, { foreignKey: "userId" });
    Payment.belongsTo(models.Cart, { foreignKey: "orderId" });
  };

  return Payment;
}; 