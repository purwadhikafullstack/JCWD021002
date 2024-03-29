import { DataTypes, Model } from 'sequelize';

export default class RatingsAndReviews extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_iduser' });
    this.belongsTo(models.Product, { foreignKey: 'product_idproduct' });
    this.belongsTo(models.Order, { foreignKey: 'order_idorder' });
  }
}

export const init = (sequelize) => {
  RatingsAndReviews.init(
    {
      user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      reviewText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reviewDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      product_idproduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_idorder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'RatingsAndReviews',
      tableName: 'ratingandreview'
    },
  );
};
