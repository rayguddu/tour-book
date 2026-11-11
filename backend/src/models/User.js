const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be atleast 2 characters"],
        maxLength: [100, "Name must be atmost 100 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "guide"],
        default: "user",
    },
    active: {
        type: Boolean,
        default: true,
    },
    // Set whenever password changes — used to invalidate old JWTs
    passwordChangedAt: {
        type: Date,
        select: false,
    },
},
    { timestamps: true },
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return

    if (!this.isNew) {
        this.passwordChangedAt = new Date(Date.now() - 100)
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password)
}
userSchema.methods.changedPasswordAfter = function (jwtIssuedAt) {
    if (!this.passwordChangedAt) return false;
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000)
    return jwtIssuedAt < changedTimestamp
}

module.exports = mongoose.model("User", userSchema);