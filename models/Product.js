const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {}
  Product.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING },
    unitPrice: { type: DataTypes.FLOAT, allowNull: false },
  }, { sequelize, modelName: 'Product' });
  return Product;
};