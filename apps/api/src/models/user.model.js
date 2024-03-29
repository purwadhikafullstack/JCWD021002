import { DataTypes, Model } from 'sequelize';

export default class User extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'role_idrole' });
    this.hasMany(models.Order, { foreignKey: 'user_iduser' });
    this.hasMany(models.Address, { foreignKey: 'user_iduser' });
    this.hasMany(models.DiscountUsage, { foreignKey: 'user_iduser' });
    this.hasMany(models.RatingsAndReviews, { foreignKey: 'user_iduser' });
    this.belongsTo(models.Store, { foreignKey: 'store_idstore' });
    this.belongsToMany(models.Discount, {
      through: 'VoucherUser',
      foreignKey: 'user_iduser',
    });
  }
}

export const init = (sequelize) => {
  User.init(
    {
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      fullname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      role_idrole: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      referralCode: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      referralBy_iduser: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      resetToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      verification_status: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      store_idstore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      resetTokenUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resetTokenExpires: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      googleLogin: {
        type: DataTypes.TINYINT,
        allowNull: false,
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'User',
      tableName: 'user',
    },
  );
};
