// src/utils/seats.js
// Calculate remaining seats for a tour on a specific date
const Booking = require("../models/Booking");

const getRemainingSeats = async (tour, startDate) => {
    // ✅ Use date range instead of exact timestamp
    const dayStart = new Date(new Date(startDate).toISOString().slice(0, 10))
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)

    const bookings = await Booking.find({
        tour: tour._id,
        startDate: { $gte: dayStart, $lt: dayEnd },  // ✅ any time on that day
        status: { $in: ["pending", "confirmed"] },
    }).select("guests");

    const booked = bookings.reduce((sum, b) => sum + b.guests, 0);
    const remaining = Math.max(0, tour.maxGroupSize - booked);

    return { booked, remaining };
};

module.exports = { getRemainingSeats };