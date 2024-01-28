'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'resetTokenUsed', {
      type: Sequelize.STRING(55),
      allowNull: false,
    });
    await queryInterface.addColumn('user', 'resetTokenExpires', {
      type: Sequelize.STRING(55),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'resetTokenUsed');
    await queryInterface.removeColumn('user', 'resetTokenExpires');
  }
};
