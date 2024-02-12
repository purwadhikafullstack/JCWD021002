'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('user', 'resetToken', {
    type: Sequelize.STRING(255),
    allowNull: true,
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('user');
}
