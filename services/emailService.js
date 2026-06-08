const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendResetPasswordEmail = async (email, resetLink) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  defaultClient.authentications["api-key"].apiKey =
    process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  await apiInstance.sendTransacEmail({
    sender: {
      email: process.env.SENDER_EMAIL,
      name: "TrimlyQ",
    },
    to: [
      {
        email,
      },
    ],
    subject: "Reset Your Password",
    htmlContent: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  });
};

module.exports = { sendResetPasswordEmail };