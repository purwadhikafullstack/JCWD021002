import { Model, DataTypes } from 'sequelize';

export default class CartDetail extends Model {
  static associate(models) {
    CartDetail.belongsTo(models.ProductStock, { foreignKey: 'productStock_idproductStock' });
    CartDetail.belongsTo(models.Cart, { foreignKey: 'cart_idcart' });
  }
}

export const init = (sequelize) => {
  CartDetail.init(
    {
      productStock_idproductStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      cart_idcart: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'CartDetail',
    },
  );
};
