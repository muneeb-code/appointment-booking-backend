const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Booking Endpoints
router.post("/", bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.put("/:id/reschedule", bookingController.rescheduleBooking);
router.delete("/:id", bookingController.cancelBooking);

module.exports = router;
