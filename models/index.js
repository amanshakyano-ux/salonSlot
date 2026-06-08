const User = require("./user");
const Salon = require("./salon");
const Service = require("./service");
const Booking = require("./booking");
const ResetPass = require("./passResetLink");
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
