const Service = require("../models/service");
const Salon = require("../models/salon");
const { isInValid } = require("../services/validator");

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

const getSalonServices = async (req, res, next) => {
  try {
    const { salonId } = req.params;

    const services = await Service.findAll({
      where: { salonId },
    });

    return res.status(200).json({
      success: true,
      services,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createService,
  getSalonServices,
};