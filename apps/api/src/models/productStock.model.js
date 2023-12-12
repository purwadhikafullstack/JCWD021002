import { DataTypes, Model } from 'sequelize';

export default class ProductStock extends Model {
  static associate(models) {
    ProductStock.belongsTo(models.Product, { foreignKey: 'product_idproduct' });
    ProductStock.belongsTo(models.Store, { foreignKey: 'store_idstore' });
    ProductStock.hasMany(models.OrderDetail, { foreignKey: 'productStock_idproductStock' });
    ProductStock.hasMany(models.Journal, { foreignKey: 'productStock_idproductStock' });
    ProductStock.hasMany(models.Discount, { foreignKey: 'productStock_idproductStock' });
    ProductStock.hasMany(models.CartDetail, { foreignKey: 'productStock_idproductStock' });
    ProductStock.hasMany(models.VoucherProduct, { foreignKey: 'productStock_idproductStock' });
    ProductStock.hasMany(models.RatingsAndReviews, { foreignKey: 'productStock_idproductStock' });
  }
}

export const init = (sequelize) => {
  ProductStock.init(
    {
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_idproduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      store_idstore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'ProductStock',
    },
  );
};
