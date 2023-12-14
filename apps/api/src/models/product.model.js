import { DataTypes, Model } from 'sequelize';

export default class Product extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'createdBy_iduser' });
    this.hasMany(models.ProductStock, { foreignKey: 'product_idproduct' });
    this.hasMany(models.ProductImage, { foreignKey: 'product_idproduct' });
    this.belongsToMany(models.ProductCategory, {
      through: 'ProductCategory_has_Product',
      foreignKey: 'product_idproduct',
    });
  }
}

export const init = (sequelize) => {
  Product.init(
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdBy_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Product',
      tableName: 'product',
    },
  );
};
