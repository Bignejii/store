module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM("xim", "zen", "reasnow", "dma", "optimizer"),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        downloadUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isRequiredForDma(value) {
                    if (this.category === 'dma' && (value === null || value === undefined)) {
                        throw new Error('Amount is required for the dma category.');
                    }
                }
            }
        }
    });

    return Product;
};