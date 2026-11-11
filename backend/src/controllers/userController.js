const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const createError = require("../utils/createError");

const signToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const getMe = catchAsync(async (req, res) => {
    res.status(200).json({ success: true, data: { user: req.user } })
})


const updateMe = catchAsync(async (req, res, next) => {
    const { name, email } = req.body
    if (name !== undefined) req.user.name = name
    if (email !== undefined) req.user.email = email

    await req.user.save();
    res.status(200).json({ success: true, data: { user: req.user } })

})
const updatePassword = catchAsync(async function (req, res, next) {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
        return next(
            createError("currentPassword and newPassword are required", 400),
        );
    }
    if (newPassword.length < 8) {
        return next(createError("New password must be at least 8 characters", 400));
    }
    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) return next(createError("Current password is incorrect", 401));
    user.password = newPassword;
    await user.save();
    const token = signToken(user._id);
    user.password = undefined;
    res.status(200).json({ success: true, token, data: { user } });
})
const listUsers = catchAsync(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page)) || 1
    const limit = Math.max(1, parseInt(req.query.limit)) || 20
    const skip = (page - 1) * limit
    const total = await User.countDocuments()
    const users = await User.find().sort({ createdAt: -1 }).skip(skip).limit(limit)

    res.status(200).json({
        success: true,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: users
    })
})

const adminUpdateUser = catchAsync(async (req, res, next) => {
    const { role, active } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return next(createError("User not found", 404));
    if ((role !== undefined || active !== undefined) && req.params.id === req.user._id.toString()) {
        return next(createError("You cannot change your own role or account", 400));
    }
    if (role !== undefined) user.role = role;
    if (active !== undefined) user.active = active;

    await user.save();

    res.status(200).json({ success: true, data: { user } });
});
module.exports = {
    getMe, updateMe, updatePassword, listUsers, adminUpdateUser
}