import { DataTypes, Model } from 'sequelize';

export default class DiscountType extends Model {
  static associate(models) {
    this.hasMany(models.Discount, { foreignKey: 'type' });
  }
}

export const init = (sequelize) => {
    DiscountType.init(
    {
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'DiscountType',
      tableName: 'discounttype'
    },
  );
};
