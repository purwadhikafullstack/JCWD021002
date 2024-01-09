'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('address', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_iduser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    addressLine: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    city_idcity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    postalCode: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('address');
}
