require("dotenv").config();

const { Cashfree, CFEnvironment } = require("cashfree-pg");

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

const createCashfreeOrder = async ({
  orderId,
  amount,
  customerId,
  customerName,
  customerEmail,
  customerPhone,
}) => {
  const request = {
    order_id: orderId,
    order_amount: amount,
    order_currency: "INR",

    customer_details: {
      customer_id: String(customerId),
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
    },

    order_meta: {
      return_url: `${process.env.FRONTEND_URL}/payment-success?order_id={order_id}`,
    },
  };

   try {
    const response = await cashfree.PGCreateOrder(request);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getCashfreeOrderStatus = async (orderId) => {
  const response = await cashfree.PGFetchOrder(orderId);

  return response.data;
};

module.exports = {
  createCashfreeOrder,
  getCashfreeOrderStatus,
};