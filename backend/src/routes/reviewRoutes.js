const express = require("express")
const { protect, restrictTo } = require("../middleware/auth");
const { getTourReviews } = require("../controllers/reviewController");

const router = express.Router()

// router.use(protect);

// ---------- public routes ----------
router.get("/:id", getTourReviews)

// ---------- admin only routes ----------

module.exports = router