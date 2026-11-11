const Review = require("../models/Review");
const Tour = require("../models/Tour");
const Booking = require("../models/Booking");
const catchAsync = require("../utils/catchAsync");
const createError = require("../utils/createError");
const { getPagination, getTotalPages } = require("../utils/pagination");
const updateTourRating = require("../utils/updateTourRating");

const createReview = catchAsync(async (req, res, next) => {
    const tourId = req.params.id;
    const { rating, comment } = req.body

    const tour = await Tour.findById(tourId);
    if (!tour) return next(createError("Tour not found", 404))

    const completedBooking = await Booking.findOne({
        user: req.user._id,
        tour: tour._id,
        status: "completed"
    })
    if (!completedBooking) {
        return next(createError("You can review a tour after you have taken it", 403))
    }
    const existing = await Review.findOne({ tour: tour._id, user: req.user._id });
    if (existing) {
        return next(createError("You have already reviewed this tour", 400));
    }
    const review = await Review.create({
        tour: tour._id,
        user: req.user._id,
        rating,
        comment
    })
    await updateTourRating(tour._id);
    res.status(201).json({ success: true, data: { review } });
})
const getTourReviews = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return next(createError("Tour not found", 404))

    const { page, limit, skip } = getPagination(req.query)
    // 1. Total reviews count karo (DB se)
    const total = await Review.countDocuments({ tour: tour._id });

    // 2. Pages calculate karo
    const pages = getTotalPages(total, limit);
    const reviews = await Review.find({ tour: tour._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name");
    res.status(200).json({
        success: true,
        total,
        page,
        pages: Math.ceil(total / limit) || 1,
        data: reviews,
    });
})
module.exports = {
    createReview, getTourReviews
}