// src/models/Tour.js
// Tour model for Wayfar
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Tour name is required"],
            unique: true,
            trim: true,
            minlength: [5, "Tour name must be at least 5 characters"],
            maxlength: [60, "Tour name must be at most 60 characters"],
        },
        summary: {
            type: String,
            required: [true, "Summary is required"],
            trim: true,
            minlength: [10, "Summary must be at least 10 characters"],
            maxlength: [300, "Summary must be at most 300 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [5000, "Description must be at most 5000 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0.01, "Price must be greater than 0"],
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
            min: [1, "Duration must be at least 1 day"],
            max: [60, "Duration must be at most 60 days"],
            validate: {
                validator: Number.isInteger,
                message: "Duration must be a whole number of days",
            },
        },
        maxGroupSize: {
            type: Number,
            required: [true, "Max group size is required"],
            min: [1, "Max group size must be at least 1"],
            max: [100, "Max group size must be at most 100"],
        },
        difficulty: {
            type: String,
            required: [true, "Difficulty is required"],
            enum: {
                values: ["easy", "medium", "difficult"],
                message: "Difficulty must be easy, medium or difficult",
            },
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, "Cover image is required"],
        },
        images: {
            type: [String],
            default: [],
            validate: {
                validator: (arr) => arr.length <= 8,
                message: "A tour can have at most 8 extra images",
            },
        },
        startDates: {
            type: [Date],
            default: [],
        },
        ratingsAverage: {
            type: Number,
            default: 0,
            min: [0, "Ratings average cannot be below 0"],
            max: [5, "Ratings average cannot be above 5"],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);
module.exports = mongoose.model("Tour", tourSchema);