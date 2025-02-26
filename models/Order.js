const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {}

  Order.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
      customerId: { type: DataTypes.STRING, allowNull: false },
      regionId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Regions", key: "id" } },
      paymentId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Payments", key: "id" } },
      dateOfSale: { type: DataTypes.DATE, allowNull: false },
      shippingCost: { type: DataTypes.FLOAT },
      discount: { type: DataTypes.FLOAT },
    },
    { sequelize, modelName: "Order" }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Customer, { foreignKey: "customerId" });
    Order.belongsTo(models.Region, { foreignKey: "regionId" });
    Order.belongsTo(models.Payment, { foreignKey: "paymentId" });
  };
  

  return Order;
};

