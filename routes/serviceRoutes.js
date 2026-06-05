const express = require("express");
const { authenticate, adminAuth } = require("../middleware/auth");
const {
  createService,
  getSalonServices,
  updateService,
  deleteService,
} = require("../controller/service");
const router = express.Router();

router.post("/create", authenticate, adminAuth, createService);
router.get("/:salonId", getSalonServices);
router.put("/:serviceId", authenticate, adminAuth, updateService);

router.delete("/:serviceId", authenticate, adminAuth, deleteService);

module.exports = router;
