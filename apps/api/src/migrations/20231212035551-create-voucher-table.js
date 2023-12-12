'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('voucher', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    code: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    minimumPurchaseAmount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    discountAmount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    discountPercentage: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    maxDiscountAmount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    expiryDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    usageType: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('voucher');
}
