require("dotenv").config()
require('express-async-errors');

//express
const express = require("express")
const app = express()

//pakages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

//routes
const users = require("./routes/users")
const bookings = require("./routes/bookings")
const authRoutes = require("./routes/auth")
const connectDB = require("./db/connect")

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const port = 3000

app.use(express.static("public"))
app.use(express.json())

//Routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", users)
app.use("/api/v1/bookings", bookings)

//Custom error handlers
app.use(notFoundMiddleware);
app.use(errorMiddleware);

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