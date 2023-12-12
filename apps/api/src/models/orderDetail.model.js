import { DataTypes, Model } from 'sequelize';

export default class OrderDetail extends Model {
  static associate(models) {
    OrderDetail.belongsTo(models.Order, { foreignKey: 'order_idorder' });
    OrderDetail.belongsTo(models.ProductStock, { foreignKey: 'productStock_idproductStock' });
  }
}

export const init = (sequelize) => {
  OrderDetail.init(
    {
      order_idorder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productStock_idproductStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'OrderDetail',
    },
  );
};
