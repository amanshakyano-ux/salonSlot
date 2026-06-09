const Payment = require("../models/payment");
const Service = require("../models/service");
const { createCashfreeOrder ,getCashfreeOrderStatus} = require("../services/cashfreeService");
 const { sendBookingConfirmationEmail,} = require("../services/emailService")
const Booking = require("../models/booking");



const createOrder = async (req, res, next) => {
  try {
    const { serviceId, bookingDate, slotTime } = req.body;

    if (!serviceId || !bookingDate || !slotTime) {
      return res.status(400).json({
        success: false,
        message: "serviceId, bookingDate and slotTime are required",
      });
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const orderId = `ORDER_${Date.now()}_${req.user.id}`;

    const order = await createCashfreeOrder({
      orderId,
      amount: Number(service.price),
      customerId: req.user.id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      customerPhone: req.user.phone || "9999999999",
    });

    const payment = await Payment.create({
      orderId,
      paymentSessionId: order.payment_session_id,
      amount: service.price,
      currency: "INR",
      status: "pending",
      bookingDate,
      slotTime,
      userId: req.user.id,
      salonId: service.salonId,
      serviceId: service.id,
    });

    return res.status(201).json({
      success: true,
      message: "Payment order created successfully",
      orderId,
      paymentSessionId: order.payment_session_id,
      payment,
    });
  } catch (err) {
    next(err);
  }
};




const verifyPayment = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const payment = await Payment.findOne({
      where: { orderId },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment order not found",
      });
    }

    const orderStatus = await getCashfreeOrderStatus(orderId);

    if (orderStatus.order_status !== "PAID") {
      payment.status = "failed";
      await payment.save();

      return res.status(400).json({
        success: false,
        message: "Payment not completed",
        orderStatus: orderStatus.order_status,
      });
    }
const existingBookedBooking = await Booking.findOne({
  where: {
    salonId: payment.salonId,
    bookingDate: payment.bookingDate,
    slotTime: payment.slotTime,
    status: "booked",
  },
});

if (existingBookedBooking) {
  return res.status(409).json({
    success: false,
    message: "This slot is already booked",
  });
}
    const booking = await Booking.create({
      userId: payment.userId,
      salonId: payment.salonId,
      serviceId: payment.serviceId,
      bookingDate: payment.bookingDate,
      slotTime: payment.slotTime,
      status: "booked",
    });

    payment.status = "success";
    await payment.save();
try {
  await sendBookingConfirmationEmail(req.user, payment);
} catch (emailErr) {
  console.error("Booking confirmation email failed:", emailErr);
}


    return res.status(200).json({
      success: true,
      message: "Payment verified and booking created",
      booking,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "This slot is already booked",
      });
    }

    next(err);
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
 