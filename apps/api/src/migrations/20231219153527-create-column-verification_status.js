'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('user', 'verification_status', {
    type: Sequelize.STRING(45),
    allowNull: false,
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('user');
}
