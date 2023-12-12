import { Model, DataTypes } from 'sequelize';

export default class Order extends Model {
  static associate(models) {
    Order.belongsTo(models.User, { foreignKey: 'user_iduser' });
    Order.belongsTo(models.Store, { foreignKey: 'store_idstore' });
    Order.hasMany(models.OrderDetail, { foreignKey: 'order_idorder' });
  }
}

export const init = (sequelize) => {
  Order.init(
    {
      user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      store_idstore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      codeTransaction: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Order',
    },
  );
};
