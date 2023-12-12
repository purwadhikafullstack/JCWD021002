'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    fullname: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    registrationDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    role_idrole: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    refferalCode: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    refferalBy_iduser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('user');
}
