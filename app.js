require("dotenv").config()
const express = require("express")
const app = express()
const users = require("./routes/users")
const bookings = require("./routes/bookings")
const connectDB = require("./db/connect")

const port = 3000

//Middleware
app.use(express.static("public"))
app.use(express.json())

//Routes
app.use("/api/v1/users", users)
app.use("/api/v1/bookings", bookings)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is running: {\n    PORT: ${port},\n}\n[Welcome to Gig Connect Server]\n`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()