// src/config/db.js
// Connects to MongoDB 
const mongoose = require("mongoose");
const connectDB = async () => {

    try {
        await mongoose.connect(process.env.DATABASE)
        console.log("database connected successfully")
    } catch (error) {
        console.error("mongo db connection error", error)
        process.exit(1)
    }
}

module.exports = connectDB;