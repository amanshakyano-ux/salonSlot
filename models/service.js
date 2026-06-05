const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  durationMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Service;