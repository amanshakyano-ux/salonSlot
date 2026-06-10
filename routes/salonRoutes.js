const express = require("express");
const { authenticate } = require("../middleware/auth");
const { loginUser, signupUser } = require("../controller/auth");
const { searchSalons, getSalon } = require("../controller/salon");
const upload = require("../utils/upload");
const router = express.Router();
router.get("/ping", (req, res) => {
  res.json({
    success: true,
    message: "Salon route working",
  });
});

router.get("/search", searchSalons);
router.get("/:salonId", getSalon);

module.exports = router;
