import { DataTypes, Model } from 'sequelize';

export default class Store extends Model {
  static associate(models) {
    this.belongsTo(models.City, { foreignKey: 'city_idcity' });
    this.hasMany(models.ProductStock, { foreignKey: 'store_idstore' });
    this.hasMany(models.Order, { foreignKey: 'store_idstore' });
    this.hasMany(models.Journal, { foreignKey: 'store_idstore' });
    this.hasMany(models.User, { foreignKey: 'store_idstore' });
    this.hasMany(models.Discount, { foreignKey: 'store_idstore' });
  }
}

export const init = (sequelize) => {
  Store.init(
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      city_idcity: {
        type: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Store',
      tableName: 'store',
    },
  );
};
