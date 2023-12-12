'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('productCategory_has_Product', {
    productCategory_idproductCategory: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    product_idproduct: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('productCategory_has_Product');
}
