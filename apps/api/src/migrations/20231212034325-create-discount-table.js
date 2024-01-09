'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('discount', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    discountValue: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    minimumPurchase: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    productStock_idproductStock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('discount');
}
