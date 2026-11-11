// src/middleware/errorHandler.js
// Central error handler — always sends { success:false, message }
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Server error";
    // Mongoose validation error -> join all messages
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(", ");
    }

    // Duplicate key (unique index) -> code 11000
    if (err.code === 11000) {
        statusCode = 400;
        if (err.keyValue && err.keyValue.email) {
            message = "Email already in use";
        } else {
            message = "Duplicate field value";
        }
    }

    // Invalid ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid id";
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }
    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired";
    }

    res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;