const User = require("../models/user");
const { isInValid } = require("../services/validator");
const { generateToken } = require("../services/jwt");
const bcrypt = require("bcrypt");

const signupUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (isInValid(name) || isInValid(email)) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory" });
    }
    if (password.length <= 5)
      return res
        .status(400)
        .json({
          success: false,
          message: "Password length should be greter than 6",
        });
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "This Email Is Already Exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: role || "user",
      });
      return res
        .status(201)
        .json({ success: true, message: "User Created Successfully" });
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (isInValid(email) || isInValid(password)) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory" });
    }
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      where: {
        email: normalizedEmail,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exist" });
    } else {
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        return res.status(401).json({
          success: false,
          message: "Password is incorrect",
        });
      } else {
        return res.status(200).json({
          success: true,
          token: generateToken(user),
          message: "User is logged in",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { signupUser, loginUser };
