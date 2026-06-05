const os = require("os")
const numsCPUs = os.cpus().length;
const cluster= require("cluster")

if(cluster.isPrimary)
{
  console.log(`Master Process running ${process.pid}`)
  for(let i = 0; i<numsCPUs; i++)
  {
       cluster.fork()
  }
  cluster.on("exit",()=>{
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  })
}
else{


require("dotenv").config();
const db = require("./utils/db-connection");
const express = require("express");
const userRoutes = require("./routes/authRoutes");
const salonRoutes = require("./routes/salonRoutes");
const serviceRoutes = require("./routes/serviceRoutes")
require("./models")

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  }),
);



app.use("/salon", salonRoutes);

app.use("/user", userRoutes);

app.use("/service",serviceRoutes)

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