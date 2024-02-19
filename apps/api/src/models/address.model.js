import { Model, DataTypes } from 'sequelize';

export default class Address extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_iduser' });
    this.belongsTo(models.City, { foreignKey: 'city_idcity' });
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
      recipientNames: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      recipientsMobileNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      addressLabel: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      addressDetails: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isMain: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Address',
      tableName: 'address',
    },
  );
};
