const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class OrderItem extends Model {}
    OrderItem.init({
      id: { type: DataTypes.STRING, primaryKey: true },
      orderId: { type: DataTypes.STRING, allowNull: false },
      productId: { type: DataTypes.STRING, allowNull: false },
      quantitySold: { type: DataTypes.INTEGER, allowNull: false },
    }, { sequelize, modelName: 'OrderItem',  tableName: "order_items" }, );
    
    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, { foreignKey: "orderId" });
        OrderItem.belongsTo(models.Product, { foreignKey: "productId" });
    };
    
    return OrderItem;
  };
  