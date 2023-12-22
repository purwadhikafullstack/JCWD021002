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
    await queryInterface.addColumn('discount', 'discountAmount', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn('discount', 'usageRestrictionId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('discount', 'referralCode', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });

    await queryInterface.createTable('usagerestriction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      restriction: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
    });



    await queryInterface.addConstraint('discount', {
      fields: ['usageRestrictionId'],
      type: 'foreign key',
      name: 'fk_discount_usagerestriction',
      references: {
        table: 'usagerestriction',
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
