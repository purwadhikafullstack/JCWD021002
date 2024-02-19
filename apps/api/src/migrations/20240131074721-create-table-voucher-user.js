'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('voucheruser', {
    voucher_idvoucher: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'discount', // Assuming the referenced table is named 'voucher'
        key: 'id', // Assuming the primary key in 'voucher' table is named 'idvoucher'
      },
    },
    user_iduser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'user', // Assuming the referenced table is named 'user'
        key: 'id', // Assuming the primary key in 'user' table is named 'iduser'
      },
    },
    used: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  // Add foreign key constraints
  await queryInterface.addConstraint('voucheruser', {
    fields: ['voucher_idvoucher'],
    type: 'foreign key',
    references: {
      table: 'discount',
      field: 'id',
    },
    onDelete: 'CASCADE', // You can change the onDelete behavior as needed
  });

  await queryInterface.addConstraint('voucheruser', {
    fields: ['user_iduser'],
    type: 'foreign key',
    references: {
      table: 'user',
      field: 'id',
    },
    onDelete: 'CASCADE', // You can change the onDelete behavior as needed
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('voucheruser');
}
