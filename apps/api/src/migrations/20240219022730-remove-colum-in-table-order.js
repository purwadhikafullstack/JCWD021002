/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('order', 'image');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('order', 'image', {
      type: Sequelize.DATE,
    });
  }
};
