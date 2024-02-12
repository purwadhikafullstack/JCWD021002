/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('order', 'orderDate', {
      type: Sequelize.DATE(),
      allowNull: true,
    });
    await queryInterface.changeColumn('order', 'paymentMethod', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('order', 'orderDate');
    await queryInterface.removeColumn('order', 'paymentMethod');
  }
};