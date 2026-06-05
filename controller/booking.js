const Booking = require("../models/booking");
const Service = require("../models/service");
const Salon = require("../models/salon");

const bookNow = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const { bookingDate, slotTime } = req.body;

    if (!bookingDate || !slotTime) {
      return res.status(400).json({
        success: false,
        message: "Booking date and slot time are required",
      });
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      salonId: service.salonId,
      serviceId,
      bookingDate,
      slotTime,
      status: "booked",
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
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

 
 

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Salon,
          attributes: ["id", "name"],
        },
        {
          model: Service,
          attributes: ["id", "name", "price"],
        },
      ],
      order: [["bookingDate", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (err) {
    next(err);
  }
};



const getSalonBookings = async (req, res, next) => {
  try {
    const { salonId } = req.params;

    const salon = await Salon.findByPk(salonId);

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    if (salon.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can view only your own salon bookings",
      });
    }

    const bookings = await Booking.findAll({
      where: { salonId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Service,
          attributes: ["id", "name", "price", "durationMinutes"],
        },
      ],
      order: [
        ["bookingDate", "ASC"],
        ["slotTime", "ASC"],
      ],
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (err) {
    next(err);
  }
};

 

function generateSlots(openingTime, closingTime, gapMinutes = 30) {
  const slots = [];

  let [openHour, openMin] = openingTime.split(":").map(Number);
  let [closeHour, closeMin] = closingTime.split(":").map(Number);

  let start = openHour * 60 + openMin;
  let end = closeHour * 60 + closeMin;

  while (start < end) {
    const hour = String(Math.floor(start / 60)).padStart(2, "0");
    const min = String(start % 60).padStart(2, "0");

    slots.push(`${hour}:${min}:00`);
    start += gapMinutes;
  }

  return slots;
}

const getAvailableSlots = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const salon = await Salon.findByPk(service.salonId);

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    const allSlots = generateSlots(
      salon.openingTime,
      salon.closingTime,
      30
    );

    const bookings = await Booking.findAll({
      where: {
        salonId: salon.id,
        bookingDate: date,
        status: "booked",
      },
      attributes: ["slotTime"],
    });

    const bookedSlots = bookings.map((booking) => booking.slotTime);

    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    return res.status(200).json({
      success: true,
      date,
      salonId: salon.id,
      serviceId,
      availableSlots,
    });
  } catch (err) {
    next(err);
  }
};

 
module.exports = {
  getMyBookings,
  bookNow,
  getSalonBookings,
  getAvailableSlots
};

 