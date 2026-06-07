const Salon = require("../models/salon");
const User = require("../models/user");
const Service = require("../models/service");
const { isInValid } = require("../services/validator");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const { Op } = require("sequelize");
const  Booking  = require("../models/booking")





 const getSalon = async (req, res, next) => {
  try {
    
    const  salonId  = Number(req.params.salonId);
    if (!salonId) {
  return res.status(400).json({
    success: false,
    message: "Invalid salonId",
  });
}
    const salon = await Salon.findOne({
      where: { id: Number(salonId) },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Service,
          attributes: ["id", "name", "price", "durationMinutes"],
        },
      ],
    });

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon does not exist by salon id",
      });
    }

    return res.status(200).json({
      success: true,
      salon: {
        id: salon.id,
        name: salon.name,
        imageUrl: salon.imageUrl,
        address: salon.address,
        city: salon.city,
        area: salon.area,
        openingTime: salon.openingTime,
        closingTime: salon.closingTime,
        owner: {
          id: salon.user.id,
          name: salon.user.name,
        },
        services: salon.Services || [],
      },
    });
  } catch (err) {
    next(err);
  }
};
const searchSalons = async (req, res, next) => {
  try {
    const { query } = req.query;

    const whereClause = {};

    if (query) {
      whereClause[Op.or] = [
        {
          name: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          city: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          area: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          address: {
            [Op.like]: `%${query}%`,
          },
        },
      ];
    }

    const salons = await Salon.findAll({
      where: whereClause,

      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Service,
          attributes: ["id", "name", "price"],
        },
      ],
    });

    const formattedSalons = salons.map((salon) => {
      const services = salon.Services || [];

      const startingPrice =
        services.length > 0
          ? Math.min(...services.map((service) => Number(service.price)))
          : null;

      return {
        id: salon.id,
        name: salon.name,
        address: salon.address,
        city: salon.city,
        area: salon.area,
        openingTime: salon.openingTime,
        closingTime: salon.closingTime,
        imageUrl:salon.imageUrl,

        owner: {
          id: salon.userid,
          name: salon.user.name,
        },

        servicesFrom: startingPrice,
      };
    });

    return res.status(200).json({
      success: true,
      totalSalons: formattedSalons.length,
      salons: formattedSalons,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {  searchSalons,getSalon };
