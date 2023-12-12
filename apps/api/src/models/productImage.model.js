import { DataTypes, Model } from 'sequelize';

export default class ProductImage extends Model {
  static associate(models) {
    ProductImage.belongsTo(models.Product, { foreignKey: 'product_idproduct' });
  }
}

export const init = (sequelize) => {
  ProductImage.init(
    {
      imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      product_idproduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'ProductImage',
    },
  );
};
