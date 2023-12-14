import { Model, DataTypes } from 'sequelize';

export default class VoucherProduct extends Model {
  static associate(models) {
    this.belongsTo(models.Voucher, { foreignKey: "voucher_idvoucher" });
    this.belongsTo(models.ProductStock, { foreignKey: "productStock_idproductStock" });
  }
}

export const init = (sequelize) => {
  VoucherProduct.init(
    {
      voucher_idvoucher: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      productStock_idproductStock: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'VoucherProduct',
    }
  );
};
