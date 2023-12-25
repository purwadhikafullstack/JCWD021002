import { Model, DataTypes } from 'sequelize';

export default class City extends Model {
  static associate(models) {
    this.belongsTo(models.Province, { foreignKey: 'province_idprovince' });
    this.hasMany(models.Store, { foreignKey: 'city_idcity' });
    this.hasMany(models.Address, { foreignKey: 'city_idcity' });
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
      postalCode: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'City',
      tableName: 'city',
    },
  );
};
