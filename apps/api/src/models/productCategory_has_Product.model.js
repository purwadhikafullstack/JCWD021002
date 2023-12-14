import { DataTypes, Model } from 'sequelize';

export default class ProductCategory_has_Product extends Model {
  static associate(models) {
    this.belongsTo(models.ProductCategory, {
      foreignKey: 'productCategory_idproductCategory',
    });
    this.belongsTo(models.Product, {
      foreignKey: 'product_idproduct',
    });
  }
}

export const init = (sequelize) => {
  ProductCategory_has_Product.init(
    {
      productCategory_idproductCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      product_idproduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'ProductCategory_has_Product',
    },
  );
};
