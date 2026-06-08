const express = require("express");
const { authenticate, adminAuth } = require("../middleware/auth");
const {
  bookNow,
  getMyBookings,
  getSalonBookings,
  getAvailableSlots,
  cancelBooking,
} = require("../controller/booking");
const router = express.Router();

router.post("/book/:serviceId", authenticate, bookNow);
router.get("/my-bookings", authenticate, getMyBookings);
router.get("/salon/:salonId", getSalonBookings);
router.get("/available-slots/:serviceId", getAvailableSlots);
router.patch("/cancel/:bookingId", authenticate, cancelBooking);

module.exports = router;
