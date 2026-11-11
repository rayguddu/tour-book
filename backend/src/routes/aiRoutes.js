// src/routes/aiRoutes.js
const express = require("express");
const { protect, restrictTo } = require("../middleware/auth");
const {
    chatLimits,
    chatLimitsAfterAuth,
    adminBurst,
} = require("../middleware/aiLimits");
const { describeTour, chat } = require("../controllers/aiController");

const router = express.Router();

// Guests and logged-in users can chat.
// Order: IP burst limit -> who is this? -> daily and site-wide limits -> chat
router.post("/chat", ...chatLimits, ...chatLimitsAfterAuth, chat);

// Only admins can write tour text with AI
router.post(
    "/describe",
    adminBurst,
    protect,
    restrictTo("admin"),
    describeTour,
);

module.exports = router;