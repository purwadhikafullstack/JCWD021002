'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('order', {
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
    store_idstore: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    totalAmount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    orderDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    paymentMethod: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    codeTransaction: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('order');
}
