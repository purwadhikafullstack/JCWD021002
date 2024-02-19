/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('cart', 'addedAt', {
      type: Sequelize.DATE(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cart', 'addedAt');
  }
};