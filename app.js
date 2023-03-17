require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const express = require("express")
const app = express()
const users = require("./routes/users")

const PORT = 3000

//Middleware
app.use(express.static("public"))
app.use(express.json())

//Routes
app.use("/api/v1/users", users)


app.listen(PORT, () => {
    console.log(`Server is running: {\n    PORT: ${PORT},\n}\n[Welcome to Gig Connect Server]\n`)
})
