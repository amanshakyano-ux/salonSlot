const Service = require("../models/service");
const Salon = require("../models/salon");
const { isInValid } = require("../services/validator");

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
  getSalonServices,
};
