const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Payment extends Model {}
    Payment.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      orderId: { type: DataTypes.STRING, allowNull: false },
      method: { type: DataTypes.STRING, allowNull: false },
    }, { sequelize, modelName: 'Payment' });
    return Payment;
  };