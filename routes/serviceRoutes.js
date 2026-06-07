const express = require("express");
const { authenticate } = require("../middleware/auth");
const { getSalonServices } = require("../controller/service");
const router = express.Router();

router.get("/:salonId", getSalonServices);

module.exports = router;
