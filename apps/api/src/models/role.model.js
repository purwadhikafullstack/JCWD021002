import { DataTypes, Model } from 'sequelize';

export default class Role extends Model {
  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'role_idrole' });
  }
}

export const init = (sequelize) => {
  Role.init(
    {
      role: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Role',
    },
  );
};
