const User = require("./user");
const Salon = require("./salon");
const Service = require("./service");
const Booking = require("./booking");
const ResetPass = require("./passResetLink");
const Payment = require("./payment");

User.hasMany(Payment, { foreignKey: "userId", onDelete: "CASCADE" });
Payment.belongsTo(User, { foreignKey: "userId" });

Salon.hasMany(Payment, { foreignKey: "salonId", onDelete: "CASCADE" });
Payment.belongsTo(Salon, { foreignKey: "salonId" });

Service.hasMany(Payment, { foreignKey: "serviceId", onDelete: "CASCADE" });
Payment.belongsTo(Service, { foreignKey: "serviceId" });
User.hasMany(Salon, { foreignKey: "ownerId", onDelete: "CASCADE" });
Salon.belongsTo(User, { foreignKey: "ownerId" });

Salon.hasMany(Service, {
  foreignKey: "salonId",
  onDelete: "CASCADE",
});

Service.belongsTo(Salon, {
  foreignKey: "salonId"
});

User.hasMany(Booking, { foreignKey: "userId",onDelete:"CASCADE" });
Booking.belongsTo(User, { foreignKey: "userId" });

Salon.hasMany(Booking, { foreignKey: "salonId",onDelete:"CASCADE"});
Booking.belongsTo(Salon, { foreignKey: "salonId" });

Service.hasMany(Booking, { foreignKey: "serviceId",onDelete:"CASCADE" });
Booking.belongsTo(Service, { foreignKey: "serviceId" });

User.hasMany(ResetPass,{foreignKey:"userId",onDelete:"CASCADE"})
ResetPass.belongsTo(User,{foreignKey:"userId"})
module.exports = { User, Salon, Service, Booking,ResetPass };
