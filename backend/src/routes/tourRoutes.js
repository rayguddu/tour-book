const express = require("express")
const { createTour, getTour, updateTour, getAllTours, getAvailability } = require("../controllers/tourController");
const { protect, restrictTo } = require("../middleware/auth");
const { createReview } = require("../controllers/reviewController");

const router = express.Router()


// ---------- public routes ----------
router.get("/", getAllTours)
router.get("/:id", getTour)
router.get("/:id/availability", getAvailability);

// ---------- admin only routes ----------
router.post("/:id/review", protect, createReview);
router.post("/", protect, restrictTo("admin", "guide"), createTour)
router.patch("/:id", protect, restrictTo("admin", "guide"), updateTour)

module.exports = router