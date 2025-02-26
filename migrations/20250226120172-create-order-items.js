'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_Items', {
      id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true},
      orderId: { type: Sequelize.STRING, references: { model: 'Orders', key: 'id' }, allowNull: false },
      productId: { type: Sequelize.STRING, references: { model: 'Products', key: 'id' }, allowNull: false },
      quantitySold: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_Items');
  }
};