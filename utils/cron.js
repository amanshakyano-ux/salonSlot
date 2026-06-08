const cron = require("node-cron");
const { Op } = require("sequelize");
const { ResetPass } = require("../models");

const deleteExpiredResetLinks = () => {
  cron.schedule("*/15 * * * *", async () => {
    try {
      const deletedRows = await ResetPass.destroy({
        where: {
          expiresAt: {
            [Op.lt]: new Date(),
          },
        },
      });

      console.log(
        `Deleted ${deletedRows} expired reset tokens at ${new Date()}`
      );
    } catch (err) {
      console.log("Error deleting expired reset tokens:", err.message);
    }
  });
};

module.exports = {deleteExpiredResetLinks};