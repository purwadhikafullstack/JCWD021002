import { Model, DataTypes } from 'sequelize';

export default class Discount extends Model {
  static associate(models) {
    this.belongsTo(models.ProductStock, { foreignKey: 'productStock_idproductStock' });
  }
}

export const init = (sequelize) => {
  Discount.init(
    {
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      discountValue: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      minimumPurchase: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
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
      modelName: 'Discount',
    },
  );
};
