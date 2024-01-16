import { Model, DataTypes } from 'sequelize';

export default class Discount extends Model {
  static associate(models) {
    this.belongsTo(models.ProductStock, { foreignKey: 'productStock_idproductStock' });
    this.belongsTo(models.UsageRestriction, { foreignKey: 'usageRestrictionId' });
    this.belongsTo(models.DiscountType, { foreignKey: 'type' });
    this.belongsTo(models.DiscountDistribution, { foreignKey: 'distributionId' });
    this.belongsTo(models.Store, { foreignKey: 'store_idstore' });
  }
}

export const init = (sequelize) => {
  Discount.init(
    {
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountValue: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      minimumPurchase: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      buy_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      get_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      productStock_idproductStock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      discountAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      usageRestrictionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      referralCode: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      banner: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      discountNom: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      distributionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      store_idstore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Discount',
      tableName: 'discount',
    },
  );
};
