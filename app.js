require("dotenv").config();
const os = require("os");
const numsCPUs = os.cpus().length;
const cluster = require("cluster");

if (cluster.isPrimary) {
  console.log(`Master Process running ${process.pid}`);
  for (let i = 0; i < numsCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  
  const db = require("./utils/db-connection");
  const express = require("express");
  const userRoutes = require("./routes/authRoutes");
  const salonRoutes = require("./routes/salonRoutes");
  const serviceRoutes = require("./routes/serviceRoutes");
  const bookingRoutes = require("./routes/bookingRoutes");
  const adminRoutes = require("./routes/adminRoutes");
  const passwordRoutes = require("./routes/password");
  const paymentRoutes = require("./routes/paymentRoutes")
  
  require("./models");

  const app = express();
  const cors = require("cors")
   app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "authorization"],
  })
);
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  app.use("/salon", salonRoutes);

  app.use("/user", userRoutes);

  app.use("/service", serviceRoutes);

  app.use("/booking", bookingRoutes);

  app.use("/password", passwordRoutes);

  app.use("/admin", adminRoutes);

  app.use("/payment",paymentRoutes)

  app.use((err, req, res, next) => {
    return res.status(500).json({ success: false, message: err.message });
  });
  db.sync()
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Worker ${process.pid} running`);
      });
    })
    .catch((err) => {
      console.log("Server Is Not Running", err.message);
    });
}
