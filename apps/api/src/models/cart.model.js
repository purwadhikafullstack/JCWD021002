import { Model, DataTypes } from 'sequelize';

export default class Cart extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_iduser' });
    this.hasMany(models.CartDetail, { foreignKey: 'cart_idcart' });
  }
}

export const init = (sequelize) => {
  Cart.init(
    {
      user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      addedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Cart',
      tableName: 'cart',
    },
  );
};
