const SibApiV3Sdk = require("sib-api-v3-sdk");
  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  defaultClient.authentications["api-key"].apiKey =
    process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendResetPasswordEmail = async (email, resetLink) => {


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

const sendBookingConfirmationEmail = async (user,bookingDetails)=>{
  const email = user.email;
  const customerName = user.name;
  const bookingDate =  bookingDetails.bookingDate;
  const slotTime = bookingDetails.slotTime;
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
    subject: "Booking Confirmation",
    htmlContent: `
       <h2>Hi ${customerName},</h2>

      <p>Your salon appointment has been successfully booked.</p>

      <p>
        <strong>Date:</strong> ${bookingDate}<br/>
        <strong>Time:</strong> ${slotTime}
      </p>

      <p>Thank you for choosing TrimlyQ.</p>
    `,
  });
}

const sendBookingCancelledEmail = async (user, bookingDetails) => {
  const email = user.email;
  const customerName = user.name;

  const bookingDate = bookingDetails.bookingDate;
  const slotTime = bookingDetails.slotTime;

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
    subject: "Booking Cancelled",
    htmlContent: `
      <h2>Hi ${customerName},</h2>

      <p>Your salon appointment has been cancelled successfully.</p>

      <p>
        <strong>Date:</strong> ${bookingDate}<br/>
        <strong>Time:</strong> ${slotTime}
      </p>

      <p>If this was not intended, please book a new appointment from TrimlyQ.</p>
    `,
  });
};

const bookingCompletedEmail = async(user)=>{
 const email = user.email;
  const customerName = user.name;
 
 

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
    subject: "Booking Completed",
    htmlContent: `
      <h2>Hi ${customerName},</h2>
      <p>Hopefully you enjoyed your session</p>
      <p>Thanks</p>
    `,
  });
}

module.exports = {
  sendBookingConfirmationEmail,
  sendBookingCancelledEmail,
  bookingCompletedEmail
};

