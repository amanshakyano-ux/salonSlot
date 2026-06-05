const express= require("express")
const {authenticate,adminAuth} = require("../middleware/auth")
const {bookNow,getMyBookings,getSalonBookings,getAvailableSlots} = require("../controller/booking")
const router = express.Router();

router.post("/book/:serviceId", authenticate, bookNow);
router.get("/my-bookings", authenticate, getMyBookings);
router.get("/salon/:salonId",getSalonBookings)
router.get("/available-slots/:serviceId", getAvailableSlots);
module.exports = router;