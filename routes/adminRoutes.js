const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const { authenticate, adminAuth } = require("../middleware/auth");

const {
  completeBooking,
  createSalon,
  createService,
  updateService,
  deleteService,
  updateSalon,
  deleteSalon,
  getMySalons,
  getSalonBookings
} = require("../controller/admin");

router.use(authenticate, adminAuth);
router.post("/salon/create", upload.single("salonImage"), createSalon);
router.patch("/booking/complete/:bookingId", completeBooking);
router.post("/service/create", createService);
router.delete("/service/:serviceId", deleteService);
router.put("/service/:serviceId", updateService);
router.patch("/salon/:salonId",  upload.single("salonImage"),updateSalon);
router.delete("/salon/:salonId", deleteSalon);
router.get("/my-salons", getMySalons);
router.get("/salon/:salonId", getSalonBookings);

module.exports = router;
