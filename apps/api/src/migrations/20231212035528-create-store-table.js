'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('store', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    city_idcity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    longitude: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('store');
}
