'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('voucherProduct', {
    voucher_idvoucher: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    productStock_idproductStock: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('voucherProduct');
}
