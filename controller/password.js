const { User, ResetPass } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { sendResetPasswordEmail } = require("../services/emailService");
const sendPasswordResetLink = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || email.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const token = uuidv4();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await ResetPass.create({
      userId: user.id,
      token,
      isUsed: false,
      expiresAt,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendResetPasswordEmail(user.email, resetLink);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.trim().length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const resetToken = await ResetPass.findOne({
      where: { token },
    });

    if (!resetToken) {
      return res.status(404).json({
        success: false,
        message: "Invalid reset link",
      });
    }

    if (resetToken.isUsed) {
      return res.status(400).json({
        success: false,
        message: "Reset link already used",
      });
    }

    if (resetToken.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Reset link expired",
      });
    }

    const user = await User.findByPk(resetToken.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    resetToken.isUsed = true;
    await resetToken.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendPasswordResetLink, resetPassword };
