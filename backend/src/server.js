
require("dotenv").config()
const app = require("./app")
const connectDB = require("./config/db")

const PORT = process.env.PORT
const startServer = async () => {
    await connectDB()
    app.listen(PORT, () =>
        console.log("app is running on http://localhost:" + PORT))
}

startServer()