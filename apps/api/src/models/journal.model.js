import { Model, DataTypes } from 'sequelize';

export default class Journal extends Model {
  static associate(models) {
    Journal.belongsTo(models.Store, { foreignKey: 'store_idstore' });
    Journal.belongsTo(models.User, { foreignKey: 'admin_iduser' });
    Journal.belongsTo(models.ProductStock, { foreignKey: 'productStock_idproductStock' });
  }
}

export const init = (sequelize) => {
  Journal.init(
    {
      store_idstore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      add: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      beforeStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      afterStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      admin_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productStock_idproductStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Journal',
    },
  );
};
