const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
        required: [true, "Tour is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"]
    }
    ,
    guests: {
        type: Number,
        required: [true, "Guests is required"],
        min: [1, "Guests must be at atleast 1"],
        validate: {
            validator: Number.isInteger,
            message: "Guests must be a whole number"
        }
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        min: [0, "Total price cannot be negative"],
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "confirmed", "cancelled", "completed"],
            message: "Status must be pending, confirmed, cancelled or completed",
        },
        default: "pending",
    }
},
    { timestamps: true },
)

// For "my bookings" list (newest first)
bookingSchema.index({ user: 1, createdAt: -1 });

// For availability checks (seats for a given tour + date)
bookingSchema.index({ tour: 1, startDate: 1 });

module.exports = mongoose.model("Booking", bookingSchema);