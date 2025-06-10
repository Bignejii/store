module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return Review;
};