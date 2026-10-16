const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS for all origins & preflight OPTIONS requests
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  }),
);

// Express v5 / path-to-regexp fix for OPTIONS preflight checks
app.options(/(.*)/, cors());

app.use(express.json());

// Routes import
const bookingRoutes = require("./src/routes/bookingRoutes");
const consultantRoutes = require("./src/routes/consultantRoutes");
const customerRoutes = require("./src/routes/customerRoutes");

app.use("/bookings", bookingRoutes);
app.use("/consultants", consultantRoutes);
app.use("/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Appointment Booking API Running...");
});

// Port & Server Start (for local testing)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Always export app at the very end for Vercel Serverless Deployment
module.exports = app;
