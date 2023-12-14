'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('user', 'referralBy_iduser', {
    type: Sequelize.INTEGER,
    allowNull: true,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('user');
}
