'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('productStock', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product_idproduct: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    store_idstore: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('productStock');
}
