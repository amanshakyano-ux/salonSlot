require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token Not Recieved" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    
    next();
  } catch (err) {
     return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

const adminAuth = async (req, res, next) => {
  try {
     

    if (req.user.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Only owners can access this API"
      });
    }

    

    next();

  } catch (err) {
    next(err);
  }
};



module.exports = { authenticate,adminAuth };
