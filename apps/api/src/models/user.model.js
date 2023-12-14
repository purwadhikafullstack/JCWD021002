import { DataTypes, Model } from 'sequelize';

export default class User extends Model {
  static associate(models) {
    this.belongsTo(models.role, { foreignKey: 'role_idrole' });
    this.hasMany(models.Order, { foreignKey: 'user_iduser' });
    this.hasMany(models.Address, { foreignKey: 'user_iduser' });
    this.hasMany(models.DiscountUsage, { foreignKey: 'user_iduser' });
    this.hasMany(models.RatingsAndReviews, { foreignKey: 'user_iduser' });
  }
}

export const init = (sequelize) => {
  User.init(
    {
      username: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(45),
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
      refferalCode: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      refferalBy_iduser: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'User',
      tableName: 'user',
    },
  );
};
