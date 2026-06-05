const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Salon = sequelize.define("Salon", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  openingTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  closingTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  imageUrl: {
  type: DataTypes.STRING,
  allowNull: true,
}
});

module.exports = Salon;