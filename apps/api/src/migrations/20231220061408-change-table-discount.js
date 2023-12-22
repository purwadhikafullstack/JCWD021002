'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Discount', 'discountValue', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });

    await queryInterface.changeColumn('Discount', 'minimumPurchase', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });

    await queryInterface.addColumn('Discount', 'buy_quantity', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('Discount', 'get_quantity', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('Discount', 'productStock_idproductStock', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Discount', 'discountValue');
    await queryInterface.changeColumn('Discount', 'minimumPurchase');
    await queryInterface.removeColumn('Discount', 'buy_quantity');
    await queryInterface.removeColumn('Discount', 'get_quantity');

    await queryInterface.changeColumn('Discount', 'productStock_idproductStock', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
