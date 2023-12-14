import { DataTypes, Model } from 'sequelize';

export default class ProductCategory extends Model {
  static associate(models) {
    this.belongsToMany(models.Product, {
      through: 'ProductCategory_has_Product',
      foreignKey: 'productCategory_idproductCategory',
    });
  }
}

export const init = (sequelize) => {
  ProductCategory.init(
    {
      category: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'ProductCategory',
      tableName: 'productcategory'
    },
  );
};
