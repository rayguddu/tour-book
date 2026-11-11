const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
        required: [true, "Tour is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    }, rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating must be at most 5"],
        validate: {
            validator: Number.isInteger,
            message: "Rating must be a whole number",
        },
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
        trim: true,
        minlength: [10, "Comment must be at least 10 characters"],
        maxlength: [1000, "Comment must be at most 1000 characters"],
    },
},
    { timestamps: true },

)
module.exports = mongoose.model("Review", reviewSchema)