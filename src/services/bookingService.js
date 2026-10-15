const supabase = require("../config/supabase");

exports.createBooking = async ({
  consultant_id,
  customer_id,
  start_time,
  duration_minutes,
}) => {
  if (
    !consultant_id ||
    !customer_id ||
    !start_time ||
    !duration_minutes ||
    duration_minutes <= 0
  ) {
    const err = new Error(
      "Invalid input data. Duration must be greater than 0.",
    );
    err.statusCode = 400;
    throw err;
  }

  if (new Date(start_time) <= new Date()) {
    const err = new Error("Start time must be a future date and time.");
    err.statusCode = 400;
    throw err;
  }

  const { data: isConflict, error: rpcError } = await supabase.rpc(
    "check_booking_conflict",
    {
      p_consultant_id: parseInt(consultant_id, 10),
      p_start_time: start_time,
      p_duration: parseInt(duration_minutes, 10),
    },
  );

  if (rpcError) throw rpcError;
  if (isConflict) {
    const err = new Error(
      "Booking conflict: Consultant is already scheduled for this time slot.",
    );
    err.statusCode = 409;
    throw err;
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        consultant_id: parseInt(consultant_id, 10),
        customer_id: parseInt(customer_id, 10),
        start_time,
        duration_minutes: parseInt(duration_minutes, 10),
        status: "Scheduled",
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
};

exports.getBookings = async (consultant_id) => {
  let query = supabase
    .from("bookings")
    .select("*")
    .order("start_time", { ascending: true });

  if (consultant_id) {
    query = query.eq("consultant_id", parseInt(consultant_id, 10));
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

exports.rescheduleBooking = async (id, { start_time, duration_minutes }) => {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    const err = new Error("Invalid booking ID.");
    err.statusCode = 400;
    throw err;
  }

  const { data: existing, error: fetchErr } = await supabase
    .from("bookings")
    .select("consultant_id, status, start_time, duration_minutes")
    .eq("id", numericId)
    .single();

  if (fetchErr || !existing) {
    const err = new Error("Appointment record not found.");
    err.statusCode = 404;
    throw err;
  }

  if (existing.status !== "Scheduled") {
    const err = new Error(
      "Only appointments with status Scheduled can be rescheduled.",
    );
    err.statusCode = 400;
    throw err;
  }

  const finalStart = start_time || existing.start_time;
  const finalDuration = duration_minutes
    ? parseInt(duration_minutes, 10)
    : existing.duration_minutes;

  if (new Date(finalStart) <= new Date()) {
    const err = new Error("Rescheduled start time must be in the future.");
    err.statusCode = 400;
    throw err;
  }

  const { data: isConflict, error: rpcError } = await supabase.rpc(
    "check_booking_conflict_exclude_self",
    {
      p_booking_id: numericId,
      p_consultant_id: parseInt(existing.consultant_id, 10),
      p_start_time: finalStart,
      p_duration: finalDuration,
    },
  );

  if (rpcError) throw rpcError;
  if (isConflict) {
    const err = new Error(
      "Proposed time slot conflicts with another existing booking.",
    );
    err.statusCode = 409;
    throw err;
  }

  const { data, error } = await supabase
    .from("bookings")
    .update({ start_time: finalStart, duration_minutes: finalDuration })
    .eq("id", numericId)
    .select();

  if (error) throw error;
  return data[0];
};

exports.cancelBooking = async (id) => {
  const numericId = parseInt(id, 10);
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "Cancelled" })
    .eq("id", numericId)
    .select();

  if (error) throw error;
  if (!data || data.length === 0) {
    const err = new Error("Booking record not found.");
    err.statusCode = 404;
    throw err;
  }

  return data[0];
};
