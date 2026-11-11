const Booking = require("../models/Booking");
const Tour = require("../models/Tour");
const catchAsync = require("../utils/catchAsync");
const createError = require("../utils/createError");
const { getPagination, getTotalPages } = require("../utils/pagination");
const { getRemainingSeats } = require("../utils/seats");

const createBooking = catchAsync(async (req, res, next) => {
    const { tourId, startDate, guests } = req.body
    if (!tourId || !startDate || guests === undefined) {
        return next(createError("tourId, startDate and guests are required", 400));
    }

    const tour = await Tour.findById(tourId);
    if (!tour) return next(createError("Tour not found", 404))


    const target = new Date(startDate).toISOString().slice(0, 10)
    if (!tour.startDates.some(d => new Date(d).toISOString().slice(0, 10) === target)) return next(createError("That date is not available for this tour", 400));
    const start = new Date(startDate);
    if (start.getTime() <= Date.now()) {
        return next(createError("Start date must be in the future", 400));
    }
    if (!Number.isInteger(guests) || guests < 1) {
        return next(
            createError("Guests must be a whole number of at least 1", 400),
        );
    }
    if (guests > tour.maxGroupSize) {
        return next(createError(`Maximum group size is ${tour.maxGroupSize}`, 400));
    }
    const existing = await Booking.findOne({
        user: req.user._id,
        tour: tour._id,
        startDate: start,
        status: { $in: ["pending", "confirmed"] },
    });
    if (existing) {
        return next(
            createError(
                "You already have an active booking for that tour and date",
                400,
            ),
        );
    }

    const { remaining } = await getRemainingSeats(tour, startDate);
    if (remaining === 0) {
        return next(createError("That date is full.", 400));
    }
    if (guests > remaining) {
        return next(
            createError(`Only ${remaining} places left on that date.`, 400),
        );
    }

    const basePrice = tour.price * guests;
    const gst = basePrice * 0.10;          // 10% GST
    const totalPrice = basePrice + gst;

    const booking = await Booking.create({
        tour: tour._id,
        user: req.user._id,
        startDate: start,
        guests,
        totalPrice,
        status: "pending",
    });

    res.status(201).json({ success: true, data: { booking } });
})

const getMyBookings = catchAsync(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 }).populate("tour", "name imageCover duration");

    res.status(200).json({ success: true, data: bookings })
})

const getAllBookings = catchAsync(async (req, res) => {
    const { page, limit, skip } = getPagination(req.query)

    const filter = {}
    if (req.query.status) filter.status = req.query.status;
    const total = await Booking.countDocuments(filter)
    const bookings = await Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("user", "name email")
        .populate("tour", "name");

    res.status(200).json({
        success: true,
        total,
        page,
        pages: getTotalPages(total, limit),
        data: bookings
    })
})
const updateBookingStatus = catchAsync(async (req, res, next) => {
    const { status } = req.body
    if (!status) return next(createError("Status is required", 400));

    const booking = await Booking.findById(req.params.id);
    if (!booking) return next(createError("Booking not found", 404))

    const allowedMoves = {
        pending: ["confirmed", "cancelled"],
        confirmed: ["completed", "cancelled"],
        cancelled: [],
        completed: []
    }
    if (!allowedMoves[booking.status].includes(status)) {
        return next(
            createError(
                `Cannot move booking from ${booking.status} to ${status}`,
                400
            ))
    }
    booking.status = status
    await booking.save()

    res.status(200).json({ success: true, data: { booking } });
})
const cancelBooking = catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return next(createError("Booking not found", 404))

    if (booking.user.toString() !== req.user._id.toString()) {
        return next(createError("You do not have permission", 403))
    }

    if (!["pending", 'confirmed'].includes(booking.status)) {
        return next(createError("This booking cannot be cancelled", 400));
    }
    const hoursUntilStart =
        (new Date(booking.startDate).getTime() - Date.now()) / 36e5;
    if (hoursUntilStart <= 48) {
        return next(createError("Bookings can only be cancelled more than 48 hrs before the start date", 400))
    }
    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ success: true, data: { booking } })
})

module.exports = { createBooking, getMyBookings, getAllBookings, cancelBooking, updateBookingStatus }