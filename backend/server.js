const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const screenshotRoutes = require("./routes/screenshotRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api", screenshotRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Screenshot API is running.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

module.exports = app;
