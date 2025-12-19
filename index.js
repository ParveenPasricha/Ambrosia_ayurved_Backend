const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./Routes/UserRoute/userRoute");
const adminRoute = require("./Routes/AdminRoute/AdminLoginRoute");
const productRoutes = require('./Routes/AdminRoute/ProductRoute');

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  "https://ambrosiaayurved.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // Postman / server-to-server requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const PORT = 5000;

app.use("/api", userRoute);
app.use("/api/admin", adminRoute);
app.use('/products', productRoutes);


app.get("/", (req, res) => {
  res.send("Welcome Node Project");
});

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Database Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
