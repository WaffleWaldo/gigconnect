const mongoose = require("mongoose")

const connectDB = (url) => {
    console.log("Connected To ATLAS DB")
    mongoose.connect(url)
}

module.exports = connectDB