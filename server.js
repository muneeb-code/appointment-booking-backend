const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 1. Dynamic / Wildcard CORS fix for Vercel + Local testing
app.use(
  cors({
    origin: (origin, callback) => callback(null, true), // Allows any origin dynamically with credentials
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

// 2. Only listen to PORT when running locally (Not on Vercel)
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Always export app at the end for Vercel Serverless Function
module.exports = app;
