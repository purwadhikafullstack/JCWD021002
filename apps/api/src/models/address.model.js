import { Model, DataTypes } from 'sequelize';

export default class Address extends Model {
  static associate(models) {
    Address.belongsTo(models.User, { foreignKey: 'user_iduser' });
    Address.belongsTo(models.City, { foreignKey: 'city_idcity' });
  }
}

export const init = (sequelize) => {
  Address.init(
    {
      user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      addressLine: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      city_idcity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Address',
    },
  );
};
