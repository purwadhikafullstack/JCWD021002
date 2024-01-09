'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('journal', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    store_idstore: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    add: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    beforeStock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    afterStock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    transactionDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    admin_iduser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productStock_idproductStock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('journal');
}
