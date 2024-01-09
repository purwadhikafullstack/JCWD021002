import { DataTypes, Model } from 'sequelize';

export default class ProductStock extends Model {
  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_idproduct' });
    this.belongsTo(models.Store, { foreignKey: 'store_idstore' });
    this.hasMany(models.OrderDetail, { foreignKey: 'productStock_idproductStock' });
    this.hasMany(models.Journal, { foreignKey: 'productStock_idproductStock' });
    this.hasMany(models.Discount, { foreignKey: 'productStock_idproductStock' });
    this.hasMany(models.CartDetail, { foreignKey: 'productStock_idproductStock' });
    this.hasMany(models.VoucherProduct, { foreignKey: 'productStock_idproductStock' });
    this.hasMany(models.RatingsAndReviews, { foreignKey: 'productStock_idproductStock' });
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
      status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'ProductStock',
      tableName: 'productstock',
    },
  );
};
