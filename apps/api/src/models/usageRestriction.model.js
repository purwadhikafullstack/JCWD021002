import { DataTypes, Model } from 'sequelize';

export default class UsageRestriction extends Model {
  static associate(models) {
    this.hasMany(models.Discount, { foreignKey: 'usageRestrictionId' });
  }
}

export const init = (sequelize) => {
    UsageRestriction.init(
    {
      restriction: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'UsageRestriction',
      tableName: 'usagerestriction'
    },
  );
};
