import { Model, DataTypes } from 'sequelize';

export default class Order extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_iduser' });
    this.belongsTo(models.Store, { foreignKey: 'store_idstore' });
    this.hasMany(models.OrderDetail, { foreignKey: 'order_idorder' });
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
        allowNull: true,
      },
      paymentMethod: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      paymentCode: {
        type: DataTypes.STRING(255),
      },
      paymentStatus: {
        type: DataTypes.STRING(255),
      },
      totalDiscount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalShippingDiscount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalShipping: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Order',
      tableName: 'order',
    },
  );
};
