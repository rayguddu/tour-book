const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/ErrorHandler");
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const tourRoutes = require("./routes/tourRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const aiRoutes = require("./routes/aiRoutes")

const app = express()
app.use(express.json());
app.use(helmet())
app.use(morgan("dev"))

app.use(
    cors({
        origin: process.env.FRONTEND_URL,  // http://localhost:3000
        credentials: true,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 requests per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many attempts. Please try again later.",
    },
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "API is running" })
})
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/ai", aiRoutes);
// 404 handler (no path — safe on Express 5)
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Central error handler — MUST be last
app.use(errorHandler);

module.exports = app;