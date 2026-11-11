const express = require("express");
const { protect, restrictTo } = require("../middleware/auth");
const { getMe, updateMe, updatePassword, listUsers, adminUpdateUser } = require("../controllers/userController")

const router = express.Router();
router.use(protect);

router.get("/me", getMe);
router.patch("/update-me", updateMe);
router.patch("/update-password", updatePassword);


router.get("/users", restrictTo("admin", "guide"), listUsers)
router.patch("/:id", restrictTo("admin"), adminUpdateUser);

module.exports = router;