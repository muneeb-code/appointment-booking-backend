const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.patch("/:id", bookingController.rescheduleBooking);
router.delete("/:id", bookingController.cancelBooking);

module.exports = router;
