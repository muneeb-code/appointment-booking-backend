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

// Explicitly respond 200 OK to all OPTIONS preflight checks
app.options("*", cors());

app.use(express.json());
module.exports = app;
// Path update: src/ routes import karein
const bookingRoutes = require("./src/routes/bookingRoutes");
const consultantRoutes = require("./src/routes/consultantRoutes");
const customerRoutes = require("./src/routes/customerRoutes");

app.use("/bookings", bookingRoutes);
app.use("/consultants", consultantRoutes);
app.use("/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Appointment Booking API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
