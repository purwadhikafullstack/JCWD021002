import { DataTypes, Model } from 'sequelize';

export default class VoucherUser extends Model {
    static associate(models) {
      this.belongsTo(models.Discount, {
        foreignKey: 'voucher_idvoucher',
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_iduser',
      });
    }
  }

export const init = (sequelize) => {
    VoucherUser.init(
    {
        voucher_idvoucher: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      user_iduser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'VoucherUser',
      tableName: 'voucheruser'
    },
  );
};
