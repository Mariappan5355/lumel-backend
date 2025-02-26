const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Region extends Model {}
    Region.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
    }, { sequelize, modelName: 'Region' });
    return Region;
  };
  