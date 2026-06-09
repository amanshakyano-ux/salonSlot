const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Booking = sequelize.define("Booking",
     {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  slotTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("booked", "cancelled", "completed"),
    defaultValue: "booked",
  },
 
}
 );

module.exports = Booking;