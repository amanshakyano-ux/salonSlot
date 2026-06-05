const User = require("../models/user");
const Salon = require("../models/salon");
const Service = require("./service");
User.hasMany(Salon, { foreignKey: "ownerId", onDelete: "CASCADE" });
Salon.belongsTo(User, { foreignKey: "ownerId" });

Salon.hasMany(Service, {
  foreignKey: "salonId",
  onDelete: "CASCADE",
});

Service.belongsTo(Salon, {
  foreignKey: "salonId",
});
module.exports = { User, Salon,Service };
