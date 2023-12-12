import { DataTypes, Model } from 'sequelize';

export default class Province extends Model {
  static associate(models) {
    Province.hasMany(models.City, { foreignKey: 'province_idprovince' });
  }
}

export const init = (sequelize) => {
  Province.init(
    {
      province: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Province',
    },
  );
};
