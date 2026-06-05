const Salon = require("../models/salon");
const { isInValid } = require("../services/validator");

const createSalon = async (req, res, next) => {
  try {
    
    const {
      name,
      address,
      city,
      area,
      openingTime,
      closingTime,
    } = req.body;

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
 
    const salon = await Salon.create({
      name,
      address,
      city,
      area,
      openingTime,
      closingTime,
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

module.exports = { createSalon };