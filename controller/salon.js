const Salon = require("../models/salon");
const User = require("../models/user");
const Service = require("../models/service");
const { isInValid } = require("../services/validator");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const { Op } = require("sequelize");

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

module.exports = { createSalon, searchSalons };
