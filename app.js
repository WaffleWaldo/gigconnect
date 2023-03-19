require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const express = require("express")
const app = express()
const users = require("./routes/users")
const connectDB = require("./db/connect")

const port = 3000

//Middleware
app.use(express.static("public"))
app.use(express.json())

//Routes
app.use("/api/v1/users", users)


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