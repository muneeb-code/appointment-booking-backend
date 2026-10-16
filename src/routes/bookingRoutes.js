const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Booking Endpoints
router.post("/", bookingController.createBooking);
router.get("/", bookingController.getBookings);

// Reschedule endpoints (Dono paths allow kar diye hain taake mismatch na ho)
router.put("/:id", bookingController.rescheduleBooking);
router.put("/:id/reschedule", bookingController.rescheduleBooking);

// Cancel Booking endpoint
router.delete("/:id", bookingController.cancelBooking);

module.exports = router;
