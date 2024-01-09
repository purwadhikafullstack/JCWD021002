'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('address', 'recipientNames', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
    await queryInterface.addColumn('address', 'recipientsMobileNumber', {
      type: Sequelize.STRING(15),
      allowNull: false,
    });
    await queryInterface.addColumn('address', 'addressLabel', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn('address', 'addressDetails', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn('address', 'isMain', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('address', 'recipientNames');
    await queryInterface.removeColumn('address', 'recipientsMobileNumber');
    await queryInterface.removeColumn('address', 'addressLabel');
    await queryInterface.removeColumn('address', 'addressDetails');
    await queryInterface.removeColumn('address', 'isMain');
  }
};
