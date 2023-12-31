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
    await queryInterface.addConstraint('Product', {
      fields: ['mass_idmass'],
      type: 'foreign key',
      name: 'fk_product_mass',
      references: {
        table: 'Mass',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  
    await queryInterface.addConstraint('product', {
      fields: ['packaging_idpackaging'],
      type: 'foreign key',
      name: 'fk_product_packaging',
      references: {
        table: 'Packaging',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
