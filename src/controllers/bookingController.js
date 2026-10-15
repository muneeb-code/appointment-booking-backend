const bookingService = require("../services/bookingService");
const { sendSuccess } = require("../utils/responseHandler");

exports.createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    return sendSuccess(res, 201, "Appointment booked successfully", booking);
  } catch (error) {
    next(error);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const { consultant_id } = req.query;
    const bookings = await bookingService.getBookings(consultant_id);
    return sendSuccess(res, 200, "Bookings retrieved successfully", bookings);
  } catch (error) {
    next(error);
  }
};

exports.rescheduleBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBooking = await bookingService.rescheduleBooking(id, req.body);
    return sendSuccess(
      res,
      200,
      "Appointment rescheduled successfully",
      updatedBooking,
    );
  } catch (error) {
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cancelledBooking = await bookingService.cancelBooking(id);
    return sendSuccess(
      res,
      200,
      "Appointment cancelled successfully. Time slot released.",
      cancelledBooking,
    );
  } catch (error) {
    next(error);
  }
};
