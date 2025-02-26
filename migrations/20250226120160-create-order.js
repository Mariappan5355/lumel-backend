'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: { type: Sequelize.STRING, primaryKey: true },
      customerId: { type: Sequelize.STRING, references: { model: 'Customers', key: 'id' }, allowNull: false },
      regionId: { type: Sequelize.INTEGER, references: { model: 'Regions', key: 'id'} },
      paymentId: { type: Sequelize.INTEGER, references: { model: 'Payments', key: 'id'}},
      dateOfSale: { type: Sequelize.DATE, allowNull: false },
      paymentMethod: { type: Sequelize.STRING },
      shippingCost: { type: Sequelize.FLOAT },
      discount: { type: Sequelize.FLOAT },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};