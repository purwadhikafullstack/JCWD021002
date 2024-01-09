'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ratingAndReview', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_iduser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    rating: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    reviewText: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    reviewDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    product_idproduct: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    order_idorder: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('ratingAndReview');
}
