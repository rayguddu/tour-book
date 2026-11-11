const Tour = require("../models/Tour");
const catchAsync = require("../utils/catchAsync");
const createError = require("../utils/createError");
const { getPagination, getTotalPages } = require("../utils/pagination");
const { getRemainingSeats } = require("../utils/seats");

// Escape regex special chars so "a(b" doesn't crash
const escapeRegex = (str) => String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Parse a value to a number; return null if invalid
const toNumber = (v) => {
    if (v === undefined || v === null || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
};

// GET /api/tours?search=&difficulty=&minPrice=&maxPrice=&maxDuration=&sort=&page=&limit=
const getAllTours = catchAsync(async (req, res) => {
    const { search, difficulty, minPrice, maxPrice, maxDuration, sort } =
        req.query;

    // ----- pagination (shared util) -----
    const { page, limit, skip } = getPagination(req.query);

    // ----- filters -----
    const filter = {};

    // search: case-insensitive in name, summary or location
    if (search && String(search).trim() !== "") {
        const safe = escapeRegex(search.trim());
        filter.$or = [
            { name: { $regex: safe, $options: "i" } },
            { summary: { $regex: safe, $options: "i" } },
            { location: { $regex: safe, $options: "i" } },
        ];
    }

    // difficulty: one value or comma list (e.g. "easy,medium")
    if (difficulty) {
        const allowed = ["easy", "medium", "difficult"];
        const list = String(difficulty)
            .split(",")
            .map((d) => d.trim().toLowerCase())
            .filter((d) => allowed.includes(d));
        if (list.length > 0) filter.difficulty = { $in: list };
    }

    // price range: ignore invalid numbers
    const minP = toNumber(minPrice);
    const maxP = toNumber(maxPrice);
    if (minP !== null || maxP !== null) {
        filter.price = {};
        if (minP !== null) filter.price.$gte = minP;
        if (maxP !== null) filter.price.$lte = maxP;
    }

    // maxDuration: ignore if not a valid number
    const maxD = toNumber(maxDuration);
    if (maxD !== null) filter.duration = { $lte: maxD };

    // ----- sorting (whitelist) -----
    const allowedSort = [
        "price",
        "-price",
        "ratingsAverage",
        "-ratingsAverage",
        "createdAt",
        "-createdAt",
        "duration",
        "-duration",
    ];
    let sortBy = "-createdAt"; // default
    if (sort && allowedSort.includes(sort)) sortBy = sort;
    // ----- query -----
    const total = await Tour.countDocuments(filter);
    const tours = await Tour.find(filter).sort(sortBy).skip(skip).limit(limit);

    res.status(200).json({
        success: true,
        total,
        page,
        pages: getTotalPages(total, limit),
        data: tours,
    });
});

const createTour = catchAsync(async (req, res) => {
    const tour = await Tour.create(req.body);
    res.status(201).json({ success: true, data: { tour } })
})
const getTour = catchAsync(async (req, res, next) => {
    const tourId = req.params.id
    const tour = await Tour.findById(tourId);
    if (!tour) return next(createError("Tour not found", 404));
    res.status(200).json({ success: true, data: { tour } })
})
const updateTour = catchAsync(async (req, res, next) => {
    const tourId = req.params.id
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(createError("No fields provided to update", 400));
    }
    const tour = await Tour.findByIdAndUpdate(tourId, req.body, {
        new: true,
        runValidators: true
    });
    if (!tour) return next(createError("Tour not found", 404));
    res.status(200).json({ success: true, data: { tour } })
})



const getAvailability = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return next(createError("Tour not found", 404));

    const now = Date.now();
    const result = [];

    for (const d of tour.startDates) {
        const { booked, remaining } = await getRemainingSeats(tour, d);
        result.push({
            date: d,
            capacity: tour.maxGroupSize,
            booked,
            remaining,
            past: new Date(d).getTime() <= now,
        });
    }

    // Sort by date ascending
    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json({ success: true, data: result });
});
module.exports = { createTour, getTour, updateTour, getAllTours, getAvailability }