import { Model, DataTypes } from 'sequelize';

export default class Cart extends Model {
  static associate(models) {
    Cart.belongsTo(models.User, { foreignKey: 'user_iduser' });
    Cart.hasMany(models.CartDetail, { foreignKey: 'cart_idcart' });
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
        type: DataTypes.INTEGER,
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
    },
  );
};
