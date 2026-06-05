require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_LANGUAGE,
  },
);

(async () => {
  try {
    await db.authenticate();
    console.log("DB CONNECTED");
  } catch (err) {
    console.log(`Error from DB => ${err.message}`);
  }
})();

module.exports = db;
