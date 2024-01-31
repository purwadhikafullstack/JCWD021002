import { DataTypes, Model } from 'sequelize';

export default class DiscountDistribution extends Model {
  static associate(models) {
    this.hasMany(models.Discount, { foreignKey: 'distributionId' });
  }
}

export const init = (sequelize) => {
    DiscountDistribution.init(
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
      modelName: 'DiscountDistribution',
      tableName: 'discountdistribution'
    },
  );
};
