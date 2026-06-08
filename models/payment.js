const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  paymentSessionId: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  currency: {
    type: DataTypes.STRING,
    defaultValue: "INR",
  },

  status: {
    type: DataTypes.ENUM("pending", "success", "failed"),
    defaultValue: "pending",
  },

  bookingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  slotTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

module.exports = Payment;