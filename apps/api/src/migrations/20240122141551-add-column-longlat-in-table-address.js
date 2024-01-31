'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('address', 'latitude', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
    await queryInterface.addColumn('address', 'longitude', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('address', 'latitude');
    await queryInterface.removeColumn('address', 'longitude');
  }
};