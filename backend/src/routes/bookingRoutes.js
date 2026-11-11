const express = require("express");
const { protect, restrictTo } = require("../middleware/auth");
const {
    createBooking, getMyBookings,
    getAllBookings,
    cancelBooking,
    updateBookingStatus
} = require("../controllers/bookingController");

const router = express.Router();

router.use(protect);

router.post("/", createBooking);
router.get("/", getMyBookings);
router.patch("/:id/cancel", cancelBooking)
router.get("/all", restrictTo("admin", "guide"), getAllBookings)
router.patch("/:id/status", restrictTo("admin"), updateBookingStatus)



module.exports = router;