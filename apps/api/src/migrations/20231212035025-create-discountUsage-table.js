'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('discountUsage', {
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
    discount_iddiscount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    usageDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('discountUsage');
}
