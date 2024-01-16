import { DataTypes, Model } from 'sequelize';

export default class Packaging extends Model {
  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'packaging_idpackaging' });
  }
}

export const init = (sequelize) => {
    Packaging.init(
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
      modelName: 'Packaging',
      tableName: 'packaging'
    },
  );
};
