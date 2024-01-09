'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  // Create Packaging Table
  await queryInterface.createTable('packaging', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
  });

  // Create Mass Table
  await queryInterface.createTable('mass', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
  });

  // Remove Foreign Keys (temporary)
  // await queryInterface.removeConstraint('product', 'fk_product_mass');
  // await queryInterface.removeConstraint('product', 'fk_product_packaging');

  // Continue with the migration
  await queryInterface.addColumn('product', 'massProduct', {
    type: Sequelize.STRING(45),
    allowNull: false,
  });

  // Add Foreign Keys
  await queryInterface.addColumn('product', 'mass_idmass', {
    type: Sequelize.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'mass',
    //   key: 'id',
    // },
    // onUpdate: 'CASCADE',
    // onDelete: 'CASCADE',
  });

  await queryInterface.addColumn('product', 'packaging_idpackaging', {
    type: Sequelize.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'packaging',
    //   key: 'id',
    // },
    // onUpdate: 'CASCADE',
    // onDelete: 'CASCADE',
  });

  // Add back Foreign Keys (after the migration)
 
}

export async function down(queryInterface, Sequelize) {
  // Remove Foreign Keys
  // await queryInterface.removeConstraint('product', 'fk_product_mass');
  // await queryInterface.removeConstraint('product', 'fk_product_packaging');

  // Remove Columns
  // await queryInterface.removeColumn('product', 'massProduct');

  // // Drop Tables
  // await queryInterface.dropTable('mass');
  // await queryInterface.dropTable('packaging');
}

