const express = require('express');
const mongoose = require('mongoose');   
const dotenv = require('dotenv');
const cors = require('cors'); 
const userRoute = require('./Routes/userRoute');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ 
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const PORT = 8080;
const MONGO_DB = process.env.MONGO_DB;

app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome Node Project");
});

mongoose.connect(MONGO_DB)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Database Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
