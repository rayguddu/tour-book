const mongoose = require("mongoose")
const Review = require("../models/Review");
const Tour = require("../models/Tour");

const updateTourRating = async (tourId) => {
    if (!mongoose.Types.ObjectId.isValid(tourId)) return;

    const stats = await Review.aggregate([
        { $match: { tour: new mongoose.Types.ObjectId(tourId) } },
        {
            $group: {
                _id: "$tour",
                avg: { $avg: "$rating" },
                count: { $sum: 1 },
            },
        },
    ]);
    const avg = stats.length > 0 ? Math.round(stats[0].avg * 10) / 10 : 0; // 1 decimal
    const count = stats.length > 0 ? stats[0].count : 0;
    await Tour.findByIdAndUpdate(tourId, {
        ratingsAverage: avg,
        ratingsQuantity: count,
    });

}
module.exports = updateTourRating;