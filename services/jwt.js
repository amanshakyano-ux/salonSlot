require("dotenv").config();
const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role:user.role}, process.env.JWT_SECRETKEY);
};
module.exports = { generateToken };
