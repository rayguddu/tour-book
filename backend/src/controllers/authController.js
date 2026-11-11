const jwt = require("jsonwebtoken");
const User = require("../models/User")
const catchAsync = require("../utils/catchAsync")
const createError = require("../utils/createError")


const signToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}
const signup = catchAsync(async (req, res) => {

    const { name, email, password } = req.body
    const user = await User.create({
        name,
        email,
        password,
        role: "user", // ignore any role sent by client
    });
    const token = signToken(user._id)
    res.status(201).json({ success: true, token, data: { user } })
})
const login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body
    const user = await User.findOne({
        email: String(email || "").toLowerCase(),
    }).select("+password");
    if (!user) return next(createError("Incorrect email or password", 401));
    const isMatch = await user.comparePassword(password || "")
    if (!isMatch) return next(createError("Incorrect email or password", 401));
    if (!user.active) return next(createError("Account is deactivated", 403));
    const token = signToken(user._id)
    user.password = undefined;
    res.status(200).json({ success: true, token, data: { user } })
})


module.exports = { signup, login }