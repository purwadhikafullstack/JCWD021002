import { DataTypes, Model } from 'sequelize';

export default class Mass extends Model {
  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'mass_idmass' });
  }
}

export const init = (sequelize) => {
    Mass.init(
    {
        name: {
        type: DataTypes.STRING(45),
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
      modelName: 'Mass',
      tableName: 'mass'
    },
  );
};
