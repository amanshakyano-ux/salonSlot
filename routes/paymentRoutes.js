const express = require("express")
const {createOrder,verifyPayment} = require("../controller/payment")
const {authenticate} = require("../middleware/auth")
const router = express.Router();

router.post("/create-order", authenticate, createOrder);
router.post("/verify/:orderId", authenticate, verifyPayment);

module.exports = router;