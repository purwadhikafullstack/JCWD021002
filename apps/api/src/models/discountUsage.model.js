import { Model, DataTypes } from 'sequelize';

export default class DiscountUsage extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_iduser' });
    this.belongsTo(models.Discount, { foreignKey: 'discount_iddiscount' });
  }
}

export const init = (sequelize) => {
  DiscountUsage.init(
    {
      user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount_iddiscount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usageDate: {
        type: DataTypes.DATE,
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
      modelName: 'DiscountUsage',
    },
  );
};
