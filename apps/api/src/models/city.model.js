import { Model, DataTypes } from 'sequelize';

export default class City extends Model {
  static associate(models) {
    City.belongsTo(models.Province, { foreignKey: 'province_idprovince' });
    City.hasMany(models.Store, { foreignKey: 'city_idcity' });
    City.hasMany(models.Address, { foreignKey: 'city_idcity' });
  }
}

export const init = (sequelize) => {
  City.init(
    {
      city: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      province_idprovince: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'City',
    },
  );
};
