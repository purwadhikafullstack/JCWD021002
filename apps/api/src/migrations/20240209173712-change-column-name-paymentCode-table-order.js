'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('order', 'codeTransaction', 'paymentCode');

    // If you also want to change the data type to STRING(255), you can use changeColumn
    await queryInterface.changeColumn('order', 'paymentCode', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.addColumn('order', 'paymentStatus', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
