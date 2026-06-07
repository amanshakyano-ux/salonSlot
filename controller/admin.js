
const {Salon,Booking,Service,User} = require("../models/index")
const deleteSalon = async (req, res, next) => {
  try {
    const salonId = Number(req.params.salonId);

    if (!Number.isInteger(salonId) || salonId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid salonId",
      });
    }

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
        message: "You can delete only your own salon",
      });
    }

    await salon.destroy();

    return res.status(200).json({
      success: true,
      message: "Salon deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
const completeBooking = async (req, res, next) => {
  try {
    const id = Number(req.params.bookingId);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Booking id is invalid",
      });
    }

    const booking = await Booking.findOne({
      where: { id },
      include: [
        {
          model: Salon,
          attributes: ["ownerId"],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking is not found",
      });
    }

    if (booking.Salon.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own salon booking",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking cannot be completed",
      });
    }

    if (booking.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Booking is already completed",
      });
    }

    booking.status = "completed";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking completed successfully",
      booking,
    });
  } catch (err) {
    next(err);
  }
};
const createSalon = async (req, res, next) => {
  try {
    const { name, address, city, area, openingTime, closingTime } = req.body;

    if (
      isInValid(name) ||
      isInValid(address) ||
      isInValid(city) ||
      isInValid(area) ||
      isInValid(openingTime) ||
      isInValid(closingTime)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }
    const result = await uploadToCloudinary(req.file.buffer);

    const imageUrl = result.secure_url;

    const salon = await Salon.create({
      name,
      address,
      city,
      area,
      openingTime,
      closingTime,
      imageUrl,
      ownerId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      salon,
      message: "Salon created successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const { name, price, durationMinutes } = req.body;

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const salon = await Salon.findByPk(service.salonId);

    if (salon.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own salon service",
      });
    }

    await service.update({
      name: name || service.name,
      price: price || service.price,
      durationMinutes: durationMinutes || service.durationMinutes,
    });

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (err) {
    next(err);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const salon = await Salon.findByPk(service.salonId);

    if (salon.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own salon service",
      });
    }

    await service.destroy();

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const createService = async (req, res, next) => {
  try {
    const { salonId, name, price, durationMinutes } = req.body;

    if (
      isInValid(salonId) ||
      isInValid(name) ||
      isInValid(price) ||
      isInValid(durationMinutes)
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Mandatory",
      });
    }

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
        message: "You can add service only in your own salon",
      });
    }

    const service = await Service.create({
      salonId,
      name,
      price,
      durationMinutes,
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (err) {
    next(err);
  }
};
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "trimlyq/salons" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
const updateSalon = async (req, res, next) => {
  try {
    const salonId = Number(req.params.salonId);

    if (!Number.isInteger(salonId) || salonId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid salonId",
      });
    }

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
        message: "You can update only your own salon",
      });
    }

    const { name, address, city, area, openingTime, closingTime } = req.body;

    if (name) salon.name = name;
    if (address) salon.address = address;
    if (city) salon.city = city;
    if (area) salon.area = area;
    if (openingTime) salon.openingTime = openingTime;
    if (closingTime) salon.closingTime = closingTime;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      salon.imageUrl = result.secure_url;
    }
    await salon.save();

    return res.status(200).json({
      success: true,
      message: "Salon updated successfully",
      salon,
    });
  } catch (err) {
    next(err);
  }
};

const getMySalons = async (req, res, next) => {
  try {
    const ownerId = req.user.id;

    const salons = await Salon.findAll({
      where: {
        ownerId,
      },
      include: [
        {
          model: Service,
          attributes: ["id", "name", "price", "durationMinutes"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      totalSalons: salons.length,
      salons,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  completeBooking,
  createSalon,
  createService,
  updateService,
  deleteService,
  updateSalon,
  deleteSalon,
  getMySalons
};
