const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const createError = require("../utils/createError");

const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) return next(createError("Not logged in", 401))

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return next(err)
    }

    const user = await User.findById(decoded.id).select("+passwordChangedAt")
    if (!user) return next(createError("User no longer exists", 401));
    if (!user.active) return next(createError("Account is deactivated", 401));
    if (user.changedPasswordAfter(decoded.iat)) {
        return next(
            createError("Password recently changed. Please log in again.", 401),
        );
    }

    req.user = user;
    next();

})
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(createError("You do not have permission", 403));
        }
        next();
    }
}

module.exports = { protect, restrictTo }
