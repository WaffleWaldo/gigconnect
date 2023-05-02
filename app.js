require("dotenv").config()
require('express-async-errors');

//express
const express = require("express")
const app = express()

//database
const connectDB = require("./db/connect")

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

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
)

app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static("public"))
app.use(fileUpload())

//Routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", users)
app.use("/api/v1/bookings", bookings)

//Custom error handlers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

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